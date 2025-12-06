describe("Ecosystem Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/ecosystem");
    });
  
    it("loads successfully", () => {
      cy.contains("Ecosystem").should("exist");
    });
  
    it("shows section headers", () => {
      cy.contains("Wildlife").should("exist");
      cy.contains("Plant Life").should("exist");
      cy.contains("Habitats").should("exist");
    });
  
    it("shows images in each section", () => {
      cy.get("img").should("have.length.at.least", 1);
    });
  });
  