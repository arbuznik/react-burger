describe("constructor tests", () => {
  beforeEach("should open", () => {
    cy.visit("http://localhost:3000");
  });

  it("should add ingredients", () => {
    cy.contains("Соберите бургер");

    cy.get("[data-cy=bun]")
      .find("[class^=BurgerIngredient_image__]")
      .first()
      .drag("[class^=BurgerConstructor_ingredientsContainer__]");

    cy.get("[data-cy=main]")
      .find("[class^=BurgerIngredient_image__]")
      .first()
      .drag("[class^=BurgerConstructor_ingredientsContainer__]");
  });

  it("should open ingredient modal", () => {
    cy.get("[class^=BurgerIngredients_link__]").first().click();
    cy.contains("Детали ингредиента").should("exist");
  });

  it("should close ingredient modal", () => {
    cy.get("[class^=BurgerIngredients_link__]").first().click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("[class^=Modal_button__]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

export {};
