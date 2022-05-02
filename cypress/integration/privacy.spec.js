describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function(){
        cy.visit('./src/privacy.html')
    })

    it.only('testar a página de política de privacidade de forma independente', function() {
        cy.contains('Talking About Testing').should('be.visible')

    })

})