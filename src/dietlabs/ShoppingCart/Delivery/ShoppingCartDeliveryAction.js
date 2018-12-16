import { SHOPPING_CART_SET_DELIVERY } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryActionType'

export const shoppingCartSetDeliveryAction = delivery => (dispatch) => {
    const result = dispatch({
        type: SHOPPING_CART_SET_DELIVERY,
        delivery,
    })

    return result
}
