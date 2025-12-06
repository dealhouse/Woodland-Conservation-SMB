describe("Natural Burial Page", () => {
    const baseUrl = "http://localhost:5173";
  
    it("loads the Natural Burial page through nav", () => {
      cy.visit(baseUrl + "/");
  
      cy.contains("a", "Natural Burial").click();
  
      cy.url().should("include", "/natural-burial");
  
      cy.get("h1, h2").first().should("be.visible");
    });
  });
  