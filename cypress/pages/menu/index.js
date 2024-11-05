class Menu {
    
    irParaProdutos() {
        cy.contains('Products').click()
    }

    irParaLoginCadastro() {
        cy.contains('Signup').click()
    }

    irParaFaleConosco() {
        cy.contains('Contact us').click()
    }
}

export default new Menu()