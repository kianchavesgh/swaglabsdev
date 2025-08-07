describe('Testes de Login - Swag Labs', () => {

  const baseUrl = 'https://www.saucedemo.com/v1';

  beforeEach(() => {
    // Executa antes de cada caso de teste, acessando a página de login
    cy.visit(`${baseUrl}/index.html`);
  });

  it('TC-LOGIN-001 - Autenticação com usuário válido', () => {
    cy.get('#user-name').type('standard_user'); // insere username ** é esperadoa
    cy.get('#password').type('secret_sauce');   // insere senha
    cy.get('#login-button').click();            // clica no botão de login
    // cy.url().should('include', '/inventory.html'); // verifica redirecionamento maneira ideal
    cy.get('.product_label').should('contain', 'Products'); // verifica se fez o redirecionamento
    cy.get('#item_0_title_link > .inventory_item_name').should('include', 'Sauce Labs Backpack');
  });

  it('TC-LOGIN-002 - Usuário bloqueado', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('TC-LOGIN-003 - Usuário problemático', () => {
    cy.get('#user-name').type('problem_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
    // Opcional: aqui você pode verificar se há imagens quebradas
  });

  it('TC-LOGIN-004 - Usuário com lentidão', () => {
    cy.get('#user-name').type('performance_glitch_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    // Verifica que mesmo com lentidão, a página final foi carregada
    cy.url({ timeout: 10000 }).should('include', '/inventory.html');
  });

  it('TC-LOGIN-005 - Campo de username em branco', () => {
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required');
  });

  it('TC-LOGIN-006 - Campo de senha em branco', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Password is required');
  });

  it('TC-LOGIN-007 - Usuário e senha inválidos', () => {
    cy.get('#user-name').type('invalid_user');
    cy.get('#password').type('incorrect_password');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

});
