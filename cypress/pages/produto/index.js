class Produto {
    pesquisarProduto(produto) {
        cy.get('input#search_product').type(produto)
        cy.get('button#submit_search').click()
    }
}

export default new Produto()