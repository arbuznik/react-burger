describe("constructor tests", () => {
  beforeEach("should open", () => {
    cy.setCookie("accessToken", "token");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.visit("http://localhost:3000");
  });

  it("should add ingredients, make order and close modal", () => {
    cy.contains("Соберите бургер");

    cy.get("[data-cy=bun]")
      .find("[data-cy=BurgerIngredient]")
      .first()
      .drag("[data-cy=ConstructorContainer]");

    cy.get("[data-cy=main]")
      .find("[data-cy=BurgerIngredient]")
      .first()
      .drag("[data-cy=ConstructorContainer]");

    cy.get("button").contains("Оформить заказ").click();
    cy.contains("1245").should("exist");
    cy.get("[data-cy=ModalCloseButton]").click();
    cy.contains("1245").should("not.exist");
  });

  it("should open ingredient modal", () => {
    cy.get("[data-cy=IngredientLink]").first().click();
    cy.contains("Детали ингредиента").should("exist");
  });

  it("should close ingredient modal", () => {
    cy.get("[data-cy=IngredientLink]").first().click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("[data-cy=ModalCloseButton]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

export {};
