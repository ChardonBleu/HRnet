/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:5173/");

  cy.on("uncaught:exception", (err) => {
    const errorsToIgnore = [
      "Hydration failed",
      "hydration",
      "server rendered HTML",
      "client",
      "router",
      "Router",
    ];
    console.log("dans attrape erreur");
    const shouldIgnore = errorsToIgnore.some((errorText) =>
      err.message.toLowerCase().includes(errorText.toLowerCase()),
    );

    if (shouldIgnore) {
      console.log("Ignoring hydration error:", err.message);
      return false;
    }
    return true;
  });
});

describe("Employee Form App", () => {
  it("displays title, form, header and footer", () => {
    cy.get("main");
    cy.get("h2")
      .should("be.visible")
      .should("have.text", "Create Employee Form");
    cy.get('[data-testid="employeeForm"]').should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  it("navigate to employee and back to home when click on header links", () => {
    cy.get("main");
    cy.get("a").last().click();
    cy.get("h2").should("be.visible").should("have.text", "Current Employees");
    cy.get("a").first().click();
    cy.get("h2")
      .should("be.visible")
      .should("have.text", "Create Employee Form");
  });
});

describe("When user submit complete form", () => {
  it("displays modal and displays created employee on employees page", () => {
    cy.get("main");
    // the form
    cy.get('[data-testid="employeeForm"]').should("be.visible");
    cy.get('[id="firstName"]').should("be.visible").type("Marianne");
    cy.get('[id="lastName"]').should("be.visible").type("Dupont");
    cy.get('[id="birthDate"]').should("be.visible").type("1972-03-09");
    cy.get('[id="startDate"]').should("be.visible").type("2022-02-03");
    cy.get('[id="street"]').should("be.visible").type("284 testing Road");
    cy.get('[id="city"]').should("be.visible").type("Tarbigors");
    cy.get('[id="zipCode"]').should("be.visible").type("69420");
    cy.get('[data-testid="state"]').should("be.visible").click({ force: true });
    cy.get('[name="state"]').select("Arkansas", { force: true });
    cy.get('[data-testid="department"]')
      .should("be.visible")
      .click({ force: true });
    cy.get('[name="department"]').select("Sales", { force: true });
    // submit form
    cy.get('[data-testid="save"]').should("be.visible").click();
    // check for modal and close modal
    cy.get('[data-testid="modal-created"]')
      .should("be.visible")
      .should("have.text", "Employee created!");
    cy.get('[data-testid="modal-close"]').should("be.visible").click();
    cy.get('[data-testid="employeeForm"]').should("be.visible");
    // navigate to employees page
    cy.get("a").last().click();
    cy.get("h2").should("be.visible").should("have.text", "Current Employees");
    cy.get("tbody").children().should("have.length", "1");
    cy.get("tbody")
      .children()
      .first()
      .get("td")
      .first()
      .should("have.text", "Marianne")
      .next()
      .should("have.text", "Dupont")
      .next()
      .should("have.text", "February 03, 2022")
      .next()
      .should("have.text", "Sales")
      .next()
      .should("have.text", "March 09, 1972")
      .next()
      .should("have.text", "284 testing Road")
      .next()
      .should("have.text", "Tarbigors")
      .next()
      .should("have.text", "AR")
      .next()
      .should("have.text", "69420");
  });
});
