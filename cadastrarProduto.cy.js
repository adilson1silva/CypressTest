/// <reference types = 'cypress'/>

describe('fazer o login',() =>{
    it('Teste 1.1 - fazer o login de um utilizador CORRETO',() =>{
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body:{
                email: 'fulano@qa.com',
                password: 'teste'
            }
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Login realizado com sucesso')
        })
    })

    it('Teste 1.2 - Fazer o login do utilizador INCORRETO',() =>{
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body:{
                email: 'fulado@qa1.com',
                password: 'teste1'
            },failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq('Email e/ou senha inválidos')
        })
    })
})


describe('Utilizadores',() =>{
    it('Teste 2.1 - Listar utilizadores cadastrados',() =>{
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/usuarios'
        }).then((response) => {
            const primeiroUsuario = response.body.usuarios[0]
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(13)
            expect(primeiroUsuario.nome).to.eq('Fulano da Silva')
            expect(primeiroUsuario.email).to.eq('fulano@qa.com')
            expect(primeiroUsuario.administrador).to.eq('true')
            expect(primeiroUsuario._id).to.eq('0uxuPY0cbmQhpEz1')
        })
    })

    it('Teste 2.2 - Cadastrar utilizadores',() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body:{
                "nome": "Fulana da Silva",
                "email": "beltrana@qa.com.br",
                "password": "teste",
                "administrador": "true"
              }
        }).then((response) =>{
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
    })

    it('Teste 2.3 - Testar cadastrar com um email cadastrado',() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body:{
                "nome": "Fulana da Silva",
                "email": "beltrana@qa.com.br",
                "password": "teste",
                "administrador": "true"
              },failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Este email já está sendo usado')
        })
    })

    it('Teste 2.4 - Buscar utilizador por ID',() =>{
        let id = 'AAvyQEXhzIsaIpJs'
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/usuarios/'+id
        }).then((response) =>{
            expect(response.body.nome).to.eq('Marcia Martins')
            expect(response.body.email).to.eq('marciamartins@qa.com.br')
        })
    })

    it('Teste 2.5 - Excluir utilizador',() => {
        let idDelete = 'dbE5kFRkp2Ib9LA2'
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/usuarios/'+idDelete
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })

    it.only('Teste 2.6 - Editar utilizador',() =>{
        let idPut = 'iyGMUNDfRN3ToI5N'
        cy.request({
            method: 'PUT',
            url: 'http://localhost:3000/usuarios/'+idPut,
            body:{
                nome: 'Ady M. QA',
                email: 'AMQA@melhorqa.com',
                password: 'teste',
                administrador: 'true',
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')
        })
    })
})




























































/// <reference types = 'cypress'/>

describe('Cadastrar produtos',() =>{
    let token = null
    it('Teste 1 - Gerar o token de acesso',() =>{
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
              }
        }).then((response) => {
            expect(response.status).to.equal(200)
        
            token = response.body.authorization
            expect(response.body.authorization).to.exist
        })
        
    })

    
    
      it('Teste 2 - Listar os produtos',() =>{

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: {
                "nome": "arroz",
                "preco": 1.5,
                "descricao": "food",
                "quantidade": 1000
              }
        }).then((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.eql('Cadastro realizado com sucesso')
        })
    })

    // Buscar produto por ID

    let produtoID = "pRWO8kcXOB4fwC1r"
    it('Teste 3 - Encontrar produtos por ID',() =>{
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos/'+(produtoID),

    
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.nome).to.eq('Cover computer')
            expect(response.body.descricao).to.eq('14 inch')
            expect(response.body.preco).to.eq(70)
            expect(response.body.quantidade).to.eq(31)            
        })
    })

    // detetar produto
    it('Teste 4 - Escolher um produto e deletar',() => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/produtos/'+ produtoID,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }

        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
            expect
        })
    })
})