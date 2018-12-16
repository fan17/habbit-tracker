import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory'
import ShoppingCartProductOrder from './ShoppingCartProductOrder'

export default class ShoppingCartProductOrderFactory {
    static createFromState(state) {
        const products = ShoppingCartProductsFactory.createFromState(state).products

        return new ShoppingCartProductOrder(
            state.shoppingCart.token,
            products,
        )
    }
}
