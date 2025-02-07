beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        cy.get('#username').type(' ')
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        cy.get('#username').focus().blur()
        cy.get('h2').contains('Password').click()
        cy.get('#username').should('have.attr', 'title', 'Please add username')
        cy.get('#username').should('have.css', 'box-shadow').and('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        cy.get('#username').should('have.attr', 'min', '1')
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only letters and numbers', () => {
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        cy.get('#email').should('have.attr', 'pattern').should('contain', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'border-color', 'rgb(227, 227, 227)')
        cy.get('.submit_button').should('not.be.enabled')
    })

    it('User cannot submit empty registration form', () => {
        cy.get('.submit_button').should('be.disabled')
    })

    it('BMW should not be listed in the list of the cars', () => {
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars option').each(($el) => {
            expect($el.text()).not.to.eq('BMW')
        })
    })
})
