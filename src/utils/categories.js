import { mockData } from "./data";

export const categoriesNames = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

export function getActiveCategories() {
    const categoriesWithProducts = new Set()
    mockData.forEach(ingredient => categoriesWithProducts.add(ingredient.type))

    return Array.from(categoriesWithProducts)
}

export function getIngredientsByCategory(category) {
    return mockData.filter(ingredient => ingredient.type === category)
}