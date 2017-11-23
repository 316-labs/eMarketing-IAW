describe('Contacts', function () {
  let newContact = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    phone: '123-345-567',
    country: 'Argentinum',
    city: 'La platum'
  }

  before(function () {
    cy.window().then(win => win.sessionStorage.clear());
    cy.request('delete', `${Cypress.env('api_host')}/cleanup`);
    cy.visit(`${Cypress.env('host')}`);
    cy.get('input[name="email"]').type('juan@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('.login-button').click();
  })

  beforeEach(function () {
    cy.visit(`${Cypress.env('host')}/contactos`);
  })

  it('Lists all contacts for the user logged in', function() {
    cy.get('.contact-index');
  })

  it('Creates a new contact', function() {
    cy.get('#new-contact').click();
    cy.get('input[name="firstName"]').type(newContact.firstName);
    cy.get('input[name="lastName"]').type(newContact.lastName);
    cy.get('input[name="email"]').type(newContact.email);
    cy.get('input[name="phone"]').type(newContact.phone);
    cy.get('input[name="country"]').type(newContact.country);
    cy.get('input[name="city"]').type(newContact.city);
    cy.get('input.select-dropdown').click();
    cy.get('ul.dropdown-content li:first').click();
    cy.get('.save').click();

    cy.get('.contact-index:first').within(function() {
      cy.get('li.full-name').should('contain', `${newContact.firstName} ${newContact.lastName}`);
      cy.get('li.email').should('contain', newContact.email);
      cy.get('li.phone').should('contain', newContact.phone);
    })
  })

  it(`Edits the contact ${newContact.firstName} ${newContact.lastName} to be called Eider Preider`, function() {
    newContact.firstName = 'Eider';
    newContact.lastName = 'Preider';
    cy.get('.contact-index:first').within(function() {
      cy.get('.contact-actions').click();
      cy.get('.edit').click();
    });

    cy.wait(500); // Because it needs to wait some ajax calls
    cy.get('input[name="firstName"]').type(`{selectall}{backspace}${newContact.firstName}`);
    cy.get('input[name="lastName"]').type(`{selectall}{backspace}${newContact.lastName}`);
    cy.get('.save').click();

    cy.get('.contact-index:first').within(function() {
      cy.get('li.full-name').should('contain', `${newContact.firstName} ${newContact.lastName}`);
    });
  })

  it('Looks for all contacts named Eider and finds at least one', function() {
    cy.get('input[name="nameOrEmail"]').type('Eider');
    cy.get('.search-contact').within(function () {
      cy.get('button').click();
    });

    cy.get('.contact-index:first').within(function() {
      cy.get('li.full-name').should('contain', 'Eider');
    });
  })

  it('Deletes the contact named Eider Preider', function() {
    cy.get('.contact-index:first').within(function () {
      cy.get('.contact-actions').click();
      cy.get('.delete').click();
    });

    cy.get('.contact-index:first').within(function () {
      cy.get('li.full-name').should('not.contain', 'Eider Preider');
    });
  })
})