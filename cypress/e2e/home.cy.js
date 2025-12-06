import { mount } from "cypress/react";
import Home from "../../src/pages/Home.jsx";

describe("Home Component", () => {

  it("mounts successfully", () => {
    mount(<Home />);
    cy.contains("Welcome to the Woodland Conservation Site").should("exist");
  });

  it("shows the hero audio section", () => {
    mount(<Home />);
    cy.contains("Listen to this section").should("exist");
  });

});
