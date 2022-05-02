Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    
    cy.get('#firstName').type("John")
    cy.get('#lastName').clear().type("Mary")
    cy.get('#email').type("teste@teste.com.br")
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})