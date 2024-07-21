beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionality (google yourself for solution!)
 */

describe('Registration Form 3 - Functional Tests', () => {
    beforeEach(() => {
        cy.visit('cypress/fixtures/registration_form_3.html')
    })

    it.only('should fill in all fields and submit the form', () => {
        cy.get('#name').type('John Doe')
        cy.get('#email').type('john.doe@example.com')
        cy.get('#country').select('Spain')
        cy.get('#birthday').type('2000-01-01')
        cy.get('input[type="file"]').attachFile('example.jpg')
        cy.get('#myCheck').check()
        cy.get('button[type="submit"]').click()

        // Assert that the form was submitted
        // You can add specific assertions based on the form submission behavior
    })

    it.only('should fill in only mandatory fields and submit the form', () => {
        cy.get('#name').type('John Doe')
        cy.get('#email').type('john.doe@example.com')
        cy.get('#country').select('Spain')
        cy.get('#myCheck').check()
        cy.get('button[type="submit"]').click()

        // Assert that the form was submitted
        // You can add specific assertions based on the form submission behavior
    })

    it.only('should show errors when mandatory fields are absent', () => {
        cy.get('button[type="submit"]').click()

        // Assert that error messages are shown for mandatory fields
        cy.get('#name:invalid').should('have.length', 1)
        cy.get('#email:invalid').should('have.length', 1)
        cy.get('#country:invalid').should('have.length', 1)
        cy.get('#myCheck:invalid').should('have.length', 1)
    })

    it.only('should upload a file', () => {
        cy.get('input[type="file"]').attachFile('example.jpg')
        // Assert file upload success, depending on implementation
    })
})


/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Visual tests for registration form 3', () => {
    it('Radio buttons and its content', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('label[for="daily"]').should('contain', 'Daily')
        cy.get('label[for="weekly"]').should('contain', 'Weekly')
        cy.get('label[for="monthly"]').should('contain', 'Monthly')
        cy.get('label[for="never"]').should('contain', 'Never')
    })

    it('Dropdown and dependencies between country and city', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').children().should('have.length', 3).and('contain', 'Tallinn')
        cy.get('#country').select('Finland')
        cy.get('#city').children().should('have.length', 2).and('contain', 'Helsinki')
        cy.get('#country').select('Estonia')
        cy.get('#city').should('not.have.value')
    })

    it('Checkboxes, their content and links', () => {
        cy.get('input[name="privacy_policy"]').should('exist')
        cy.get('input[name="cookie_policy"]').should('exist')
        cy.get('input[name="privacy_policy"]').next('label').should('contain', 'Accept our privacy policy')
        cy.get('input[name="cookie_policy"]').next('label').should('contain', 'Accept our cookie policy')
    })

    it('Email format validation', () => {
        cy.get('input[name="email"]').type('invalid-email')
        cy.get('input[name="email"]').blur()
        cy.get('input[name="email"]').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
})
