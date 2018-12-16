import GraphQLFetch from 'GraphQL/GraphQLFetch'
import {
    SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST,
    SHOPPING_CART_PRODUCT_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_PRODUCT_SAVE_FAILED_RECEIVED_RESPONSE,
} from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveActionType'
import { SHOPPING_CART_SET_TOKEN } from 'view/ShoppingCart/Token/ShoppingCardTokenActionType'
import ShoppingCartProductOrderFactory from 'view/ShoppingCart/Product/Order/ShoppingCartProductOrderFactory'
import Mutation from './ShoppingCartProductSaveMutation'

export const shoppingCartProductSaveAction = () => (dispatch, getState) => {
    const productsOrder = ShoppingCartProductOrderFactory.createFromState(getState())

    dispatch({
        type: SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST,
    })

    return GraphQLFetch
        .runMutation(Mutation, productsOrder).then((res) => {
            if (
                res
                && res.data
                && res.data.sale
                && res.data.sale.savePaymentProducts
                && res.data.sale.savePaymentProducts.token
            ) {
                dispatch({
                    type: SHOPPING_CART_SET_TOKEN,
                    token: res.data.sale.savePaymentProducts.token,
                })

                return dispatch({
                    type: SHOPPING_CART_PRODUCT_SAVE_SUCCESS_RECEIVED_RESPONSE,
                    cart: res.data.sale.savePaymentProducts,
                })
            }
            return dispatch({ type: SHOPPING_CART_PRODUCT_SAVE_FAILED_RECEIVED_RESPONSE })
        })
}
