/// <reference types="cypress" />
import { expect } from "chai";

describe("Tests for the exercise 2 route", () => {
  it("checks that the start thumb can move and the current value changes to be greater", () => {
    cy.visit("/exercise2");

    cy.get('[data-testid="start-thumb"]').move({ deltaX: 200, deltaY: 0 });
    cy.get('[data-testid="current-start-thumb-value"]')
      .invoke("text")
      .then((value1) => {
        const number1 = parseFloat(value1);
        cy.get('[data-testid="start-thumb"]').move({ deltaX: 300, deltaY: 0 });
        cy.get('[data-testid="current-start-thumb-value"]')
          .invoke("text")
          .then((value2) => {
            const number2 = parseFloat(value2);
            expect(number2).to.be.greaterThan(number1);
          });
      });
  });
  it("checks that the end thumb can move and the current value changes to be less", () => {
    cy.visit("/exercise2");

    cy.get('[data-testid="end-thumb"]').move({ deltaX: 700, deltaY: 0 });
    cy.get('[data-testid="current-end-thumb-value"]')
      .invoke("text")
      .then((text1) => {
        const number1 = parseFloat(text1);
        cy.get('[data-testid="end-thumb"]').move({ deltaX: 900, deltaY: 0 });
        cy.get('[data-testid="current-end-thumb-value"]')
          .invoke("text")
          .then((text2) => {
            const number2 = parseFloat(text2);
            expect(number2).to.be.greaterThan(number1);
          });
      });
  });
  it("checks that the start thumb can't cross the end thumb", () => {
    cy.visit("/exercise2");

    cy.get('[data-testid="start-thumb"]').move({ deltaX: 300, deltaY: 0 });
    cy.get('[data-testid="end-thumb"]').move({ deltaX: 600, deltaY: 0 });
    cy.get('[data-testid="start-thumb"]').move({ deltaX: 800, deltaY: 0, force: true });
    cy.get('[data-testid="start-thumb"]').then((el) => {
      const startThumbLeft = el[0].getBoundingClientRect().left;
      cy.get('[data-testid="end-thumb"]').then((el) => {
        const endThumbLeft = el[0].getBoundingClientRect().left;
        expect(startThumbLeft).to.be.lessThanOrEqual(endThumbLeft);
      });
    });

    cy.get('[data-testid="current-end-thumb-value"]')
      .invoke("text")
      .then((endThumbValueText) => {
        const endThumbValue = parseFloat(endThumbValueText);
        cy.get('[data-testid="current-start-thumb-value"]')
          .invoke("text")
          .then((startThumbValueText) => {
            const startThumbValue = parseFloat(startThumbValueText);
            expect(startThumbValue).to.be.lessThanOrEqual(endThumbValue);
          });
      });
  });
});

export {};
