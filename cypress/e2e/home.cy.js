describe("Home Page", () => {
    const baseUrl = "http://localhost:5173";
  
    it("loads the Home page successfully", () => {
      cy.visit(baseUrl + "/");
  
      cy.contains("Welcome to the Woodland Conservation Site").should("be.visible");
    });
  });
  