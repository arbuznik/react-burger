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

export function getIngredientsURLs(
  ingredients: IIngredient[],
  orderIngredients: string[]
): string[] {
  let result: string[] = [];
  orderIngredients.forEach((ingredient) => {
    const ingr = ingredients.find((i) => i._id === ingredient);
    if (ingr) {
      result.push(ingr.image_mobile);
    }
  });

  return result;
}
