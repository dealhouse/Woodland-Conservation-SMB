describe("Home Page", () => {
    it("loads successfully", () => {
      cy.visit("http://localhost:5173/");
      cy.contains("Welcome to the Woodland Conservation Site").should("exist");
    });
  
    it("displays the intro audio player", () => {
      cy.contains("Listen to this section").should("exist");
    });
  
    it("shows the TEST banner image", () => {
      cy.get("img").should("exist");
    });
  });
  