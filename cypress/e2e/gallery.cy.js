describe("Gallery Page", () => {
    const baseUrl = "http://localhost:5173";
  
    it("loads the Gallery page via navigation", () => {
      cy.visit(baseUrl + "/");
  
      cy.contains("a", "Gallery").click();
  
      cy.url().should("include", "/gallery");
  
      // Should detect the gallery images or grid
      cy.get("img, figure, .gallery-grid, .gallery-item")
        .first()
        .should("exist");
    });
  });
  