describe('Users', function() {
  beforeEach(function(){
    cy.window().then(win => win.sessionStorage.clear());
    cy.request('delete', `${Cypress.env('api_host')}/cleanup`);
    cy.visit(`${Cypress.env('host')}`)
  })

  it('logins user named Juan correctly', function () {
    cy.get('input[name="email"]').type('juan@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('.login-button').click();
    cy.get('.salir');
  })

  it('does not allow a user to login due to incorrect password or email', function () {
    cy.get('input[name="email"]').type('fake@email.com');
    cy.get('input[name="password"]').type('incorrect-password');
    cy.get('.login-button').click();
    cy.get('.unauthorized')
  })

  it('registers a user named Pepe correctly', function () {
    cy.get('.register-button').click();
    cy.get('input[name="name"]').type('Pepe');
    cy.get('input[name="lastName"]').type('José');
    cy.get('input[name="email"]').type('pepe@test.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('.register-button').click();
    cy.get('.salir');
  })
})