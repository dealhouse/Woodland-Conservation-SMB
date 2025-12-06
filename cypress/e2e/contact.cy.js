describe("Contact Page", () => {
    const baseUrl = "http://localhost:5173";
  
    it("loads the Contact page from navigation", () => {
      cy.visit(baseUrl + "/");
  
      cy.contains("a", "Contact").click();
  
      cy.url().should("include", "/contacts");
  
      cy.contains("Contact & Inquiry Form").should("be.visible");
      cy.contains("Full Name").should("be.visible");
    });
  });
  