import { SHOPPING_CART_PRODUCT_REMOVE } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveActionType'
import { shoppingCartProductSaveAction } from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveAction'

export const shoppingCartProductRemoveAction = (productId, amount) => (dispatch) => {
    let action = {
        type: SHOPPING_CART_PRODUCT_REMOVE,
        productId,
    }

    if (amount !== undefined) {
        action = { ...action, amount }
    }

    const result = dispatch(action)

    dispatch(shoppingCartProductSaveAction())

    return result
}
