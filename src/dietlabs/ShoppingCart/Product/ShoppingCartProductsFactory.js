import ShoppingCartProducts from './ShoppingCartProducts'

export default class ShoppingCartProductsFactory {
    static createFromState(state) {
        return new ShoppingCartProducts(
            state.shoppingCart.products,
            state.saleProducts,
        )
    }
}
