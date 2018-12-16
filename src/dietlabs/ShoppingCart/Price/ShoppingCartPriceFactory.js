import ShoppingCartDeliveryOptionsFactory from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionsFactory'
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory'
import ShoppingCartPrice from './ShoppingCartPrice'

export default class ShoppingCartPriceFactory {
    static createFromState(state) {
        const products = ShoppingCartProductsFactory.createFromState(state).products
        const deliveryOption = ShoppingCartDeliveryOptionsFactory.createFromState(state).chosen

        return new ShoppingCartPrice(
            products,
            deliveryOption,
        )
    }
}
