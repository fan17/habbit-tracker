import GraphQLFetch from 'GraphQL/GraphQLFetch'
import { SHOPPING_CART_SET_TOKEN } from 'view/ShoppingCart/Token/ShoppingCardTokenActionType'
import ShoppingCartIndexSaveOrderFactory from 'view/ShoppingCart/Index/Save/Order/ShoppingCartIndexSaveOrderFactory'
import Mutation from './ShoppingCartIndexSaveMutation'
import {
    SHOPPING_CART_INDEX_SAVE_SEND_REQUEST,
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_FAILED_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
} from './ShoppingCartIndexSaveActionType'

export const shoppingCartIndexSaveAction = (fromUpSelling = false) => (dispatch, getState) => {
    const order = ShoppingCartIndexSaveOrderFactory.createFromState(getState())

    dispatch({
        type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST,
    })

    return GraphQLFetch
        .runMutation(Mutation, order).then((res) => {
            if (
                res
                && res.data
                && res.data.sale
                && res.data.sale.savePayment
                && res.data.sale.savePayment.__typename
            ) {
                switch (res.data.sale.savePayment.__typename) {
                    case 'Payment':
                        if (res.data.sale.savePayment.token) {
                            dispatch({
                                type: SHOPPING_CART_SET_TOKEN,
                                token: res.data.sale.savePayment.token,
                            })
                        }
                        return dispatch({
                            type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                            ...res.data.sale.savePayment,
                            fromUpSelling,
                        })
                    case 'ValidationException':
                        return dispatch({
                            type: SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
                            ...res.data.sale.savePayment,
                        })
                }
            }
            return dispatch({ type: SHOPPING_CART_INDEX_SAVE_FAILED_RECEIVED_RESPONSE })
        })
}
