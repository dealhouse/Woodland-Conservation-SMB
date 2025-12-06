describe('Map Page', () => {

    it('loads successfully', () => {
      cy.visit('http://localhost:5173/map');
      cy.contains('Return to Site Map').should('exist');
    });
  
    it('shows the GPS button', () => {
      cy.visit('http://localhost:5173/map');
      cy.contains('YOU ARE HERE').should('exist');
    });
  
    it('contains the map container', () => {
      cy.visit('http://localhost:5173/map');
      cy.get('.leaflet-container').should('exist');
    });
  
    it('shows at least one marker', () => {
      cy.visit('http://localhost:5173/map');
      cy.get('.leaflet-marker-icon').should('exist');
    });
  
  });
  