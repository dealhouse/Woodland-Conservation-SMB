import { mount } from "cypress/react";
import Ecosystem from "../../src/pages/Ecosystem.jsx";

describe("Ecosystem Component", () => {

  it("mounts successfully", () => {
    mount(<Ecosystem />);
    cy.contains("Ecosystem").should("exist");
  });

  it("shows at least one section header", () => {
    mount(<Ecosystem />);
    cy.get("h2").first().should("exist");
  });

});
