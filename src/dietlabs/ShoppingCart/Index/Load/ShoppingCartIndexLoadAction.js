import GraphQLFetch from 'GraphQL/GraphQLFetch'
import Price from 'view/Price/Price'
import ShoppingCartDeliveryOption from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOption'
import {
    SALE_PRODUCT_LOAD_SEND_REQUEST,
    SALE_PRODUCT_LOAD_SUCCESS_RECEIVE_RESPONSE,
    SALE_PRODUCT_LOAD_FAILED_RECEIVE_RESPONSE,
} from 'view/Sale/Product/Load/SaleProductLoadActionType'
import { SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE } from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionActionType'
import { SHOPPING_CART_SET_DELIVERY } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryActionType'
import ShoppingCartDelivery from 'view/ShoppingCart/Delivery/ShoppingCartDelivery'
import Query from './ShoppingCartIndexLoadQuery'

export default () => (dispatch) => {
    dispatch({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })

    return GraphQLFetch
        .runQuery(Query)
        .then((res) => {
            if (res.data) {
                if (res.data.sale && res.data.sale.productVariants) {
                    dispatch({
                        type: SALE_PRODUCT_LOAD_SUCCESS_RECEIVE_RESPONSE,
                        products: res.data.sale.productVariants,
                    })
                }

                if (res.data.sale && res.data.sale.shippingOptions) {
                    const shippingOptions = res.data.sale.shippingOptions.reduce((prev, shippingOption) => {
                        prev[shippingOption.id] = new ShoppingCartDeliveryOption(
                            shippingOption.id,
                            shippingOption.name,
                            shippingOption.requiresAddress,
                            shippingOption.onlyVirtualProducts,
                            new Price(shippingOption.price.amount, shippingOption.price.currency),
                            shippingOption.countries.reduce((previous, current) => {
                                previous[current.code] = current.name
                                return previous
                            }, {}),
                        )
                        return prev
                    }, {})


                    dispatch({
                        type: SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE,
                        shippingOptions,
                    })
                }

                if (res.data.me && res.data.me.shipping) {
                    dispatch({
                        type: SHOPPING_CART_SET_DELIVERY,
                        delivery: new ShoppingCartDelivery(
                            res.data.me.shipping.name,
                            res.data.me.shipping.address,
                            res.data.me.shipping.postalCode,
                            res.data.me.shipping.city,
                            res.data.me.shipping.country ? res.data.me.shipping.country.code : '',
                            res.data.me.shipping.phone,
                        ),
                    })
                }

                return res.data
            }

            return dispatch({ type: SALE_PRODUCT_LOAD_FAILED_RECEIVE_RESPONSE })
        })
}
