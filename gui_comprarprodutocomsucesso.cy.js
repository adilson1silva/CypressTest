/// <reference types ='Cypress'/>

describe('Teste E2E - Testar a compra de um produto com sucesso', () => {
    it('Testar o login com sucesso', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('.app_logo').should('contain', 'Swag Labs')

        // Organizar os produtos pelos preços
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        
        // Confirmar os produtos
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Onesie')
        cy.contains('Sauce Labs Onesie').click()
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bike Light')
        cy.contains('Sauce Labs Bike Light').click()
        cy.get('[data-test="add-to-cart"]').click() 
        cy.get('[data-test="back-to-products"]').click()

        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bolt T-Shirt')
        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="back-to-products"]').click()

        // se foram adiciodados 3 produtos ao carinho
        cy.get('[data-test="shopping-cart-link"]').should('have.text','3')

        // checkout
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')

        // preemcher os dados
        cy.get('[data-test="firstName"]').type('Adilson')
        cy.get('[data-test="lastName"]').type('Silva')
        cy.get('[data-test="postalCode"]').type('2855-230')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="title"]').should('contain', 'Checkout: Overview')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="title"]').should('contain', 'Checkout: Complete!')

        

        
    });
});

