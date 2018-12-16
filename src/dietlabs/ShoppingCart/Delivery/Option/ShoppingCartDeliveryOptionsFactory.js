import ShoppingCartDeliveryOptions from './ShoppingCartDeliveryOptions'

export default class ShoppingCartDeliveryOptionsFactory {
    static createFromState(state) {
        return new ShoppingCartDeliveryOptions(
            state.shoppingCart.shippingOptions,
            state.shoppingCart.saleShippingId,
        )
    }
}
