import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import GraphQLFetch from 'GraphQL/GraphQLFetch'
import { shoppingCartProductSaveAction } from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveAction'
import {
    SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST,
    SHOPPING_CART_PRODUCT_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_PRODUCT_SAVE_FAILED_RECEIVED_RESPONSE,
} from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveActionType'
import { SHOPPING_CART_SET_TOKEN } from 'view/ShoppingCart/Token/ShoppingCardTokenActionType'
import Mutation from '../ShoppingCartProductSaveMutation'

describe('shoppingCartProductSaveAction', () => {
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

        const productsOrder = {
            products: [],
        }

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, productsOrder)
            .returns(
                new Promise((resolve) => {
                    resolve('whatever')
                }),
            )

        store.dispatch(shoppingCartProductSaveAction(productsOrder)).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST })
        })
    })

    it('should dispatch `successReceiveResponse` on success', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                token: null,
                products: [],
            },
            saleProduct: {},
        })

        const productsOrder = {
            products: [],
        }

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, productsOrder)
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                savePaymentProducts: {
                                    token: 'example-token',
                                    anotherProperty: 'anotherProperty',
                                },
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartProductSaveAction(productsOrder)).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SHOPPING_CART_SET_TOKEN,
                token: 'example-token',
            })
            expect(store.getActions()[2]).toEqual({
                type: SHOPPING_CART_PRODUCT_SAVE_SUCCESS_RECEIVED_RESPONSE,
                cart: {
                    token: 'example-token',
                    anotherProperty: 'anotherProperty',
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

        const productsOrder = {
            products: [],
        }

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, productsOrder)
            .returns(
                new Promise((resolve) => {
                    resolve('failed')
                }),
            )

        store.dispatch(shoppingCartProductSaveAction(productsOrder)).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_PRODUCT_SAVE_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({ type: SHOPPING_CART_PRODUCT_SAVE_FAILED_RECEIVED_RESPONSE })
        })
    })
})
