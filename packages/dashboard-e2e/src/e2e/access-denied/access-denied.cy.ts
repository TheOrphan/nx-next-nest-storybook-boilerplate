describe('dashboard: AccessDenied component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accessdenied--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AccessDenied!');
    });
});
