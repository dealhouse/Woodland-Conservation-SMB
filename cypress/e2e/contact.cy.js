describe("Contact Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/contacts");
    });
  
    it("loads successfully", () => {
      cy.contains("Contact").should("exist");
      cy.contains("Inquiry Form").should("exist");
    });
  
    it("allows typing into fields", () => {
      cy.get("input[name='fullName']").type("Test User");
      cy.get("input[name='email']").type("test@example.com");
      cy.get("textarea[name='message']").type("Hello world");
    });
  
    it("shows inquiry type dropdown", () => {
      cy.get("select[name='inquiryType']").select("General Inquiry");
    });
  
    it("Send OTP button exists", () => {
      cy.contains("Send OTP").should("exist");
    });
  });
  