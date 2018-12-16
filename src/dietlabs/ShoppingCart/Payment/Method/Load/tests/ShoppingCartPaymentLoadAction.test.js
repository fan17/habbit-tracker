import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import GraphQLFetch from 'GraphQL/GraphQLFetch'
import * as ShoppingCartPaymentMethodLoadParseResponse from 'view/ShoppingCart/Payment/Method/Load/ParseResponse/ShoppingCartPaymentLoadParseResponse'
import {
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
} from '../ShoppingCartPaymentLoadActionType'
import Query from '../ShoppingCartPaymentLoadQuery'
import { shoppingCartPaymentMethodsLoadAction } from '../ShoppingCartPaymentLoadAction'


describe('ShoppingCartPaymentLoadActionAction', () => {
    let shoppingCartPaymentMethodLoadParseResponseFake = null
    let GraphQLFetchMock = null
    beforeEach(() => {
        shoppingCartPaymentMethodLoadParseResponseFake = sinon.fake.returns(['whatever'])
        sinon.replace(ShoppingCartPaymentMethodLoadParseResponse, 'shoppingCartPaymentMethodLoadParseResponse', shoppingCartPaymentMethodLoadParseResponseFake)

        GraphQLFetchMock = sinon.mock(GraphQLFetch)
    })
    afterEach(() => {
        sinon.restore()
        GraphQLFetchMock.restore()
    })

    it('should always dispatch SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const operators = null

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query, {})
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                operators,
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartPaymentMethodsLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST })
        })
    })

    it('should dispatch SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE when operators are not set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query, {})
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                // operators are not set
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartPaymentMethodsLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE })
        })
    })

    it('should dispatch SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE when operators are set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const operators = 'not-null'

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query, {})
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                operators,
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartPaymentMethodsLoadAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
                paymentMethods: ['whatever'],
            })
        })
    })

    it('should return null when operators are not set', async () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query, {})
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                // operators are not set
                            },
                        },
                    })
                }),
            )

        const result = await store.dispatch(shoppingCartPaymentMethodsLoadAction())

        expect(result).toEqual(null)
    })

    it('should return array with payment methods when operators are set', async () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const operators = 'not-null'

        GraphQLFetchMock
            .expects('runQuery')
            .withExactArgs(Query, {})
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                operators,
                            },
                        },
                    })
                }),
            )

        const result = await store.dispatch(shoppingCartPaymentMethodsLoadAction())

        expect(result).toEqual(['whatever'])
    })
})
