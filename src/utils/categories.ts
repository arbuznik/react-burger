import { ICategoriesNames, IIngredient } from "../types/types";

export const categoriesNames: ICategoriesNames = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export function getActiveCategories(ingredients: IIngredient[]): string[] {
  const categoriesWithProducts = new Set<string>();
  ingredients.forEach((ingredient) =>
    categoriesWithProducts.add(ingredient.type)
  );

  return Array.from(categoriesWithProducts);
}

export function getIngredientsByCategory(
  ingredients: IIngredient[],
  category: string
): IIngredient[] {
  return ingredients.filter((ingredient) => ingredient.type === category);
}
