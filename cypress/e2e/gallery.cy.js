import { mount } from "cypress/react";
import Gallery from "../../src/pages/Gallery.jsx";

describe("Gallery Component", () => {

  it("mounts successfully", () => {
    mount(<Gallery />);
    cy.contains("Gallery").should("exist");
  });

  it("renders at least one image or item", () => {
    mount(<Gallery />);
    cy.get("img, video, .gallery-item").should("exist");
  });

});
