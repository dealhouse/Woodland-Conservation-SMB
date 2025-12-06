import { mount } from "cypress/react";
import NaturalBurial from "../../src/pages/NaturalBurial.jsx";

describe("Natural Burial Component", () => {

  it("mounts successfully", () => {
    mount(<NaturalBurial />);
    cy.contains("Natural Burial").should("exist");
  });

  it("renders a section or paragraph", () => {
    mount(<NaturalBurial />);
    cy.get("p").should("exist");
  });

});
