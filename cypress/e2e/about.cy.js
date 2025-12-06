import { mount } from "cypress/react";
import About from "../../src/pages/About.jsx";

describe("About Component", () => {

  it("mounts successfully", () => {
    mount(<About />);
    cy.contains("About St. Margaret’s Bay Woodland Conservation").should("exist");
  });

  it("loads About Us section", () => {
    mount(<About />);
    cy.contains("About Us").should("exist");
  });

  it("has Read Aloud button", () => {
    mount(<About />);
    cy.contains("Read Aloud").should("exist");
  });

});
