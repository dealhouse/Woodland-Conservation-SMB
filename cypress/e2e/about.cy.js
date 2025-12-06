describe('About Page', () => {

    it('loads successfully', () => {
      cy.visit('http://localhost:5173/about');
      cy.contains('About').should('exist');
    });
  
    it('displays the intro section', () => {
      cy.visit('http://localhost:5173/about');
      cy.contains('Our Purpose').should('exist');
    });
  
    it('shows the vision section', () => {
      cy.visit('http://localhost:5173/about');
      cy.contains('Vision').should('exist');
    });
  
    it('has working navigation back to Home', () => {
      cy.visit('http://localhost:5173/about');
      cy.contains('Home').click();
      cy.url().should('include', '/');
    });
  
  });
  