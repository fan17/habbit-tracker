export const shoppingCartProductIsInCartAction = (productId, products) => (
    Boolean(products.filter(product => product.id === productId).length)
)
