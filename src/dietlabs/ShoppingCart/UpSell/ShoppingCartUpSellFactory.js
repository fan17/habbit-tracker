import ShoppingCartUpSell from './ShoppingCartUpSell'

export default class ShoppingCartProductsFactory {
    static createFromState(state) {
        return new ShoppingCartUpSell(
            state.shoppingCart.upSellProducts,
            state.saleProducts,
        )
    }
}
