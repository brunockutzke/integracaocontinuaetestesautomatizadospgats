/// <reference types="cypress" />

import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import faleConosco from '../pages/faleConosco'
import carrinho from '../pages/carrinho'
import assinatura from '../pages/assinatura'
import produto from '../pages/produto'
import { faker } from '@faker-js/faker'

describe('Automation Exercise - With Page Objects Model', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })

    it('Test Case 1: Cadastrar um usuário', () => {
        menu.irParaLoginCadastro()

        cadastro.preencherFormulario()

        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
    });

    it('Test Case 2: Login User with correct email and password', () => {
        menu.irParaLoginCadastro()

        login.preencherLogin('tester-1722793689998@mail.com', '12345')

        cy.get('i.fa-user').parent().should('contain', 'Tester QA')
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        menu.irParaLoginCadastro()

        login.preencherLogin('tester-1234@mail.com', '54321')

        cy.get(`.login-form form p`).should('contain', 'Your email or password is incorrect')
    });

    it('Test Case 4: Logout User', () => {
        menu.irParaLoginCadastro()

        login.preencherLogin('tester-1722793689998@mail.com', '12345')

        cy.get('i.fa-user').parent().should('contain', 'Tester QA')

        cy.contains('Logout').click()

        cy.url().should('contain', 'login')
    });

    it('Test Case 5: Register User with existing email', () => {
        menu.irParaLoginCadastro()

        cadastro.registrarUsuario('tester-1722793689998@mail.com')
        
        cy.get('.signup-form form p')
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form', () => {
        menu.irParaFaleConosco()

        faleConosco.preencherFormularioContato()

        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

    it('Test Case 8: Verify All Products and product detail page', () => {
        menu.irParaProdutos()

        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()

        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
    });

    it('Test Case 9: Search Product', () => {
        
        menu.irParaProdutos()

        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')

        produto.pesquisarProduto('Shirt')

        cy.get('.title').should('be.visible').and('contain', 'Searched Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
    });

    it('Test Case 10: Verify Subscription in home page', () => {
        assinatura.cadastrarAssinatura('tester-1722793689998@mail.com')

        cy.contains('You have been successfully subscribed!').should('be.visible')
    });

    it('Test Case 15: Place Order: Register before checkout', () => {
        menu.irParaLoginCadastro()

        cadastro.preencherFormulario()

        cy.get('b').should('contain', Cypress.env('signUpName'))

        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()

        carrinho.realizarPedido()

        cadastro.deletarCadastro()

        cy.get('[data-qa="continue-button"]').click()
    });
});