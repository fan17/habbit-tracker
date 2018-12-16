import { shoppingCartProductGetToSmartRemove } from 'view/ShoppingCart/Product/GetToSmartRemove/ShoppingCartProductGetToSmartRemove'
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory'
import { SHOPPING_CART_PRODUCT_REMOVE } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveActionType'
import { shoppingCartProductSaveAction } from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveAction'
import { SHOPPING_CART_PRODUCT_ADD } from './ShoppingCartProductAddActionType'

export const shoppingCartProductAddAction = (productId, amount, shouldSaveProducts = true) => (dispatch, getState) => {
    const saleProduct = getState().saleProducts[productId]
    const currentCartProducts = ShoppingCartProductsFactory.createFromState(getState()).products

    const productIdsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, currentCartProducts)

    productIdsToRemove.map((productToRemove) => {
        dispatch({
            type: SHOPPING_CART_PRODUCT_REMOVE,
            productId: productToRemove.id,
        })
    })

    if (amount === undefined) {
        amount = 1
    }

    const action = dispatch({
        type: SHOPPING_CART_PRODUCT_ADD,
        productId,
        amount,
    })

    if (shouldSaveProducts) {
        dispatch(shoppingCartProductSaveAction())
    }

    return action
}
