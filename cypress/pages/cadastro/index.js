class Cadastro {
    registrarUsuario(email) {
        cy.get('[data-qa="signup-name"]').type('Tester QA')
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormulario() {

        const timestamp = new Date().getTime()

        const signUpName = 'Tester QA'

        Cypress.env('signUpName', signUpName)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
        cy.contains('button', 'Signup').click()

        cy.get('input[type="radio"]').first().check()

        cy.get('[type=password]').type('12345', { log: false })

        cy.get('[data-qa="days"]').select('5')
        cy.get('[data-qa="months"]').select('November')
        cy.get('[data-qa="years"]').select('1993')

        cy.get('[data-qa="first_name"]').type('Cristiano')
        cy.get('[data-qa="last_name"]').type('Ronaldo')
        cy.get('[data-qa="company"]').type('Tigrinho Tabajara')
        cy.get('[data-qa="address"]').type('Rua XV')
        cy.get('[data-qa="country"]').type('Brasil')
        cy.get('[data-qa="state"]').type('Paraná')
        cy.get('[data-qa="city"]').type('Curitiba')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')

        cy.get('[data-qa="account-created"]').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()
    }

    deletarCadastro() {
        cy.get('[href *="delete"]').click()
        cy.get('b').should('contain', 'Account Deleted!')
    }
}

export default new Cadastro()