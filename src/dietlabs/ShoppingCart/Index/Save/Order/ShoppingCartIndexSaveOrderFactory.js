import ShoppingCartDeliveryOptionsFactory from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionsFactory'
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory'
import ShoppingCartIndexSaveOrder from 'view/ShoppingCart/Index/Save/Order/ShoppingCartIndexSaveOrder'

export default class ShoppingCartIndexSaveOrderFactory {
    static createFromState(state) {
        const deliveryOptions = ShoppingCartDeliveryOptionsFactory.createFromState(
            state,
        )
        const products = ShoppingCartProductsFactory.createFromState(state)
            .products

        return new ShoppingCartIndexSaveOrder(
            state.shoppingCart.token,
            products,
            state.shoppingCart.saleShippingId,
            deliveryOptions.areShippingDataNeeded
                ? state.shoppingCart.delivery
                : null,
            state.auth.token ? null : state.shoppingCart.userData,
        )
    }
}
