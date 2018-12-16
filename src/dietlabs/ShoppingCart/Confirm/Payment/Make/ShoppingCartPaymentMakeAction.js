import GraphQLFetch from 'GraphQL/GraphQLFetch'
import ValidationError from 'view/Validation/ValidationError'
import { SHOPPING_CART_CLEAR } from 'view/ShoppingCart/Clear/ShoppingCartClearActionType'
import Mutation from './ShoppingCartPaymentMakeMutation'
import {
    SHOPPING_CART_PAYMENT_MAKE_FAILED_RECEIVED_RESPONSE,
    SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION,
    SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR,
    SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
} from './ShoppingCartPaymentMakeActionType'

// TODO
export const shoppingCartPaymentMakeAction = (
    token,
    methodId,
    channelId,
) => (dispatch) => {
    methodId = methodId ? Number(methodId) : null

    return GraphQLFetch.runMutation(Mutation, {
        token,
        methodId,
        channelId,
    }).then((res) => {
        if (
            res
            && res.data
            && res.data.sale
            && res.data.sale.makePayment
            && res.data.sale.makePayment.__typename
        ) {
            let result = null
            const payment = res.data.sale.makePayment

            switch (res.data.sale.makePayment.__typename) {
                case 'Payment':
                    if (payment.url) {
                        result = {
                            type: SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR,
                            url: payment.url,
                        }
                    } else {
                        result = {
                            type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                            isCod: payment.isCod,
                            isBankTransfer: payment.isBankTransfer,
                        }
                    }
                    dispatch({ type: SHOPPING_CART_CLEAR })
                    break
                case 'ValidationException':
                    result = {
                        type: SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION,
                        error: ValidationError.createFromObject(
                            res.data.sale.makePayment,
                        ),
                    }
                    break
            }

            return result
        }

        return {
            type: SHOPPING_CART_PAYMENT_MAKE_FAILED_RECEIVED_RESPONSE,
        }
    })
}
