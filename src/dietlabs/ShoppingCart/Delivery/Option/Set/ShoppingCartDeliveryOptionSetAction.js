import { SHOPPING_CART_DELIVERY_OPTION_SET } from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionActionType'

export const shoppingCartDeliveryOptionSetAction = saleShippingId => (dispatch) => {
    const result = dispatch({
        type: SHOPPING_CART_DELIVERY_OPTION_SET,
        saleShippingId,
    })

    return result
}
