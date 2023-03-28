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

export function calcPrice(
  ingredients: IIngredient[],
  orderIngredients: string[]
): number {
  let price: number = 0;
  orderIngredients.forEach((ingredient) => {
    price += ingredients.find((i) => i._id === ingredient)?.price || 0;
  });
  return price;
}

export function getIngredientsByIDs(
  ingredients: IIngredient[],
  IDs: string[]
): IIngredient[] {
  let result: IIngredient[] = [];
  IDs.forEach((id) => {
    const ingredient = ingredients.find((i) => i._id === id);
    if (ingredient) {
      result.push(ingredient);
    }
  });

  return result;
}
