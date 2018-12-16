import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
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
import { shoppingCartIndexLoadAction } from '../ShoppingCartIndexLoadAction'
import Query from '../ShoppingCartIndexLoadQuery'

describe('shoppingCartIndexLoadAction', () => {
    let GraphQLFetchMock = null

    beforeEach(() => {
        GraphQLFetchMock = sinon.mock(GraphQLFetch)
    })

    afterEach(() => {
        GraphQLFetchMock.restore()
    })

    it('should always dispatch `sendRequest`', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query)
            .returns(
                new Promise((resolve) => {
                    resolve('whatever')
                }),
            )

        store.dispatch(shoppingCartIndexLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })
        })
    })

    it('should dispatch `SALE_PRODUCT_LOAD_SUCCESS_RECEIVE_RESPONSE` when `res.data.sale.productVariants` are set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query)
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                productVariants: 'whatever',
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartIndexLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SALE_PRODUCT_LOAD_SUCCESS_RECEIVE_RESPONSE,
                products: 'whatever',
            })
        })
    })

    it('should dispatch `SHOPPING_CART_SET_DELIVERY` when ` res.data.me.shipping` is set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query)
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            me: {
                                shipping: {
                                    name: 'Tester',
                                    city: 'Poznan',
                                },
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartIndexLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SHOPPING_CART_SET_DELIVERY,
                delivery: new ShoppingCartDelivery('Tester', undefined, undefined, 'Poznan'),
            })
        })
    })

    it('should dispatch `SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE` when `res.data.sale.shippingOptions` are set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query)
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                shippingOptions: [
                                    {
                                        id: 100,
                                        name: 'example',
                                        requiresAddress: true,
                                        onlyVirtualProducts: false,
                                        price: {
                                            amount: 10,
                                            currency: 'EUR',
                                        },
                                    },
                                ],
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartIndexLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE,
                shippingOptions: {
                    100: new ShoppingCartDeliveryOption(
                        100,
                        'example',
                        true,
                        false,
                        new Price(10, 'EUR'),
                    ),
                },
            })
        })
    })


    it('should dispatch `failedReceiveResponse` on failed', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query)
            .returns(
                new Promise((resolve) => {
                    resolve('failed')
                }),
            )

        store.dispatch(shoppingCartIndexLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SALE_PRODUCT_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({ type: SALE_PRODUCT_LOAD_FAILED_RECEIVE_RESPONSE })
        })
    })
})
