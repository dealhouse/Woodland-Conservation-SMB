describe("Map Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/map");
    });
  
    it("loads successfully", () => {
      cy.contains("YOU ARE HERE").should("exist");
      cy.contains("Return to Site Map").should("exist");
    });
  
    it("displays site boundaries and markers", () => {
      cy.get(".leaflet-marker-icon").should("exist");
    });
  
    it("includes the yellow birch, farmhouse, and well labels", () => {
      cy.contains("Coastal Yellow Birch").should("exist");
      cy.contains("Farmhouse Foundation").should("exist");
      cy.contains("Well").should("exist");
    });
  });
  