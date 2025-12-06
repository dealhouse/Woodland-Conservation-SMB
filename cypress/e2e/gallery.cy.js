describe("Gallery Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/gallery");
    });
  
    it("loads successfully", () => {
      cy.contains("Gallery").should("exist");
    });
  
    it("shows at least 3 images", () => {
      cy.get("img").should("have.length.at.least", 3);
    });
  
    it("opens and closes the modal viewer", () => {
      cy.get("img").first().click();
      cy.get(".ReactModal__Content").should("exist");
      cy.get(".ReactModal__Content").click({ force: true });
    });
  });
  