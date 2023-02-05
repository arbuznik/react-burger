export const categoriesNames = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

export function getActiveCategories(ingredients) {
    const categoriesWithProducts = new Set()
    ingredients.forEach(ingredient => categoriesWithProducts.add(ingredient.type))

    return Array.from(categoriesWithProducts)
}

export function getIngredientsByCategory(ingredients, category) {
    return ingredients.filter(ingredient => ingredient.type === category)
}