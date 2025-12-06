import { mount } from "cypress/react";
import InquiryForm from "../../src/pages/Contact.jsx";

describe("Contact Component", () => {

  it("mounts successfully", () => {
    mount(<InquiryForm />);
    cy.contains("Contact & Inquiry Form").should("exist");
  });

  it("shows full name input", () => {
    mount(<InquiryForm />);
    cy.get("input[name='fullName']").should("exist");
  });

  it("shows inquiry type dropdown", () => {
    mount(<InquiryForm />);
    cy.get("select[name='inquiryType']").should("exist");
  });

});
