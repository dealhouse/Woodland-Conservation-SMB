import { mount } from "cypress/react";
import MapView from "../../src/pages/MapView.jsx";

describe("MapView Component", () => {

  it("mounts successfully", () => {
    mount(<MapView />);
    cy.contains("YOU ARE HERE").should("exist");
  });

  it("renders the map container", () => {
    mount(<MapView />);
    cy.get(".leaflet-container").should("exist");
  });

});
