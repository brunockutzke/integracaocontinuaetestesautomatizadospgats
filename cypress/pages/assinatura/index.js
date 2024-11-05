class Assinatura {
    cadastrarAssinatura(email) {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type(email)

        cy.get('button#subscribe').click()
    }
}

export default new Assinatura()