import { SHOPPING_CART_SET_USER_DATA } from './ShoppingCartUserDataActionType'

export const shoppingCartSetUserDataAction = userData => (dispatch) => {
    const result = dispatch({
        type: SHOPPING_CART_SET_USER_DATA,
        userData,
    })

    return result
}
