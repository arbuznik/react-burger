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
  return orderIngredients.reduce((sum: number, id: string) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (ingredient) {
      return sum + ingredient.price;
    }
    return sum;
  }, 0);
}

export function getIngredientsByIDs(
  ingredients: IIngredient[],
  IDs: string[]
): IIngredient[] {
  return IDs.reduce((acc: IIngredient[], id: string) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (ingredient) {
      return [...acc, ingredient];
    }
    return acc;
  }, []);
}
