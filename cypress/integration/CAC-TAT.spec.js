/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preencher os campos obrigatórios e enviar o formulário', function() {
        const longText = 'Teste, teste'
        cy.get('#firstName').type("John")
        cy.get('#lastName').clear().type("Mary")
        cy.get('#email').type("teste@teste.com.br")
        cy.get('#phone').type("99999999999")
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click() ///contains = encontra um botão que tenha o texto Enviar e clica nele

        cy.get('.success').should('be.visible')

    })

    it('exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
        const longText = 'Teste'
        cy.get('#firstName').type("John")
        cy.get('#lastName').clear().type("Mary")
        cy.get('#email').type("teste@teste,com,br")
        cy.get('#phone').type("99999999999")
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })


    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        
        cy.get('#phone')
            .type("abcdef")
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
        cy.get('#firstName').type("John")
        cy.get('#lastName').clear().type("Mary").clear().type("Maria")
        cy.get('#email').type("teste@teste,com,br")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter um formulário sem preencher os campos obrigatórios', function() {
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('envia formulário com sucesso usando um comando customizado', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })


    it('seleciona um produto (YouTube) por seu texto', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu vslor (value)', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Mentoria) por seu vslor (value)', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('#product')
        .select(1) /// seleciona pelo indice
        .should('have.value', 'blog')

    })

    it('marcar o tipo de atendimento "Feedback"', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')


    })

    it('marcar cada tipo de atendimento', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('input[type="radio"]').check()
        .should('have.length', 3)

        .each(function($radio){

            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })

    })


    it('marcar ambos checkboxes, depois desmarcar o último', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){

            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo simulando drag-and-drop', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){

            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){

            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('verifica a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })

    it('acessar a página de política de privacidade removendo o target e então clicar no link', function() {
        
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')


        })

  })