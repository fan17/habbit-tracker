import GraphQLFetch from 'GraphQL/GraphQLFetch'
import { shoppingCartPaymentMethodLoadParseResponse } from 'view/ShoppingCart/Payment/Method/Load/ParseResponse/ShoppingCartPaymentLoadParseResponse'
import {
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
} from './ShoppingCartPaymentLoadActionType'
import Query from './ShoppingCartPaymentLoadQuery'

export const shoppingCartPaymentMethodsLoadAction = () => (dispatch) => {
    dispatch({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST })

    return GraphQLFetch
        .runQuery(Query, {})
        .then((res) => {
            let result = null
            try {
                if (res.data.sale.operators === undefined) {
                    throw Error()
                }
                const paymentMethods = shoppingCartPaymentMethodLoadParseResponse(res.data.sale.operators)

                dispatch({
                    type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
                    paymentMethods,
                })

                result = paymentMethods
            } catch (exception) {
                dispatch({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE })
            }

            return result
        })
}
