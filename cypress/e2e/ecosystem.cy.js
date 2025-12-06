describe("Ecosystem Page", () => {
    const baseUrl = "http://localhost:5173";
  
    it("navigates to Ecosystem via nav bar", () => {
      cy.visit(baseUrl + "/");
  
      cy.contains("a", "Ecosystem").click();
  
      cy.url().should("include", "/ecosystem");
  
      cy.get("h1, h2").first().should("be.visible");
    });
  });
  