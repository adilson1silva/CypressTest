/// <reference types = 'cypress'/>

describe('testar uma API Rest completo', () => {
    it('test 1 - fazer um requeste e analise do get', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/usuarios'
        }).then((response)=>{
            // testar o status
            expect(response.status).to.equal(200)
            // testar o headers
            expect(response.headers).to.have.property('content-type','application/json; charset=utf-8')
            //testar o temanho do ficheiro
            expect(response.headers).to.have.property('content-length','2863')
            // quantidade de utilizadores 
            expect(response.body.quantidade).to.eq(13)
        })
        

        //validar os nomes 
        const listaNomes = [
            "Fulano da Silva",
            "Flno da Salva",
            "Marcia Martins",
            "200210141121334223113422",
            "Fulan1 da Salva",
            "Ftlano da Salva",
            "Fulano da Salva",
            "Flno da Salva",
            "Falano da Salva",
            "Flano da Salva",
            "24110411242340444210434",
            "34112301240040344133133",
            "Fulano da Silva",
        ]


        cy.request({
            method: "GET",
            url: "http://localhost:3000/usuarios",

        }).then((response)=>{
            const nomesRetomados = response.body.usuarios.map((usuario) => usuario.nome)


            listaNomes.forEach((nome) =>{
                expect(nomesRetomados).to.include(nome)
            })

        })


        //Calidar todos os nomes dos utilizadores
        cy.request({
            method: "GET",
            url: "http://localhost:3000/usuarios",

        }).then((response) => {
            response.body.usuarios.forEach((usuario) => {
                expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
                expect(['true', 'false']).to.include(usuario.administrador)
            })
        })
    });

    // produtos
    it('ver a lista de todoso os protudos cadastrados',() => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos',
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })
});

