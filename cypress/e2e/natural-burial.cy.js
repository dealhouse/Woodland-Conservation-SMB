describe("Natural Burial Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/naturalburial");
    });
  
    it("loads successfully", () => {
      cy.contains("Natural Burial").should("exist");
    });
  
    it("shows main description", () => {
      cy.contains("eco-friendly alternative").should("exist");
    });
  
    it("opens Learn More modal", () => {
      cy.contains("Learn More").click();
      cy.contains("What is Natural Burial?").should("exist");
    });
  
    it("closes Learn More modal", () => {
      cy.contains("Learn More").click();
      cy.get("button").contains("Close").click();
    });
  });
  