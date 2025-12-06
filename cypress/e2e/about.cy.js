describe("About Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/about");
    });
  
    it("loads successfully", () => {
      cy.contains("Woodland Conservation").should("exist");
    });
  
    it("shows About Us section", () => {
      cy.contains("About Us").should("exist");
      cy.contains("We care for the woodlands").should("exist");
    });
  
    it("shows Mission section", () => {
      cy.contains("Mission").should("exist");
      cy.contains("Our mission is to protect local habitats").should("exist");
    });
  
    it("shows Vision section", () => {
      cy.contains("Vision").should("exist");
      cy.contains("Our vision is a thriving woodland").should("exist");
    });
  
    it("has working Read Aloud buttons", () => {
      cy.contains("Read Aloud").should("exist");
    });
  });
  