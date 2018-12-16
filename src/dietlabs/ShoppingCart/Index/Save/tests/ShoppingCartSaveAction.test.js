import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import GraphQLFetch from 'GraphQL/GraphQLFetch'
import { SHOPPING_CART_SET_TOKEN } from 'view/ShoppingCart/Token/ShoppingCardTokenActionType'
import ShoppingCartIndexSaveOrderFactory from 'view/ShoppingCart/Index/Save/Order/ShoppingCartIndexSaveOrderFactory'
import { shoppingCartIndexSaveAction } from '../ShoppingCartIndexSaveAction'
import Mutation from '../ShoppingCartIndexSaveMutation'
import {
    SHOPPING_CART_INDEX_SAVE_SEND_REQUEST,
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_FAILED_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
} from '../ShoppingCartIndexSaveActionType'

describe('shoppingCartIndexSaveAction', () => {
    let GraphQLFetchMock = null
    let ShoppingCartIndexSaveOrderFactoryMock = null

    beforeEach(() => {
        GraphQLFetchMock = sinon.mock(GraphQLFetch)
        ShoppingCartIndexSaveOrderFactoryMock = sinon.mock(ShoppingCartIndexSaveOrderFactory)
    })

    afterEach(() => {
        GraphQLFetchMock.restore()
        ShoppingCartIndexSaveOrderFactoryMock.restore()
    })

    it('should always dispatch `sendRequest`', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const order = { whatever: 'whatever' }

        ShoppingCartIndexSaveOrderFactoryMock
            .expects('createFromState')
            .returns(order)

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, order)
            .returns(
                new Promise((resolve) => {
                    resolve('whatever')
                }),
            )

        store.dispatch(shoppingCartIndexSaveAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST })
        })
    })

    describe('SHOPPING_CART_INDEX_SAVE_SEND_REQUEST', () => {
        it('from UpSelling', () => {
            const middlewares = [thunk]
            const mockStore = configureMockStore(middlewares)

            const store = mockStore({})

            const order = { whatever: 'whatever' }

            const fromUpSelling = true

            ShoppingCartIndexSaveOrderFactoryMock
                .expects('createFromState')
                .returns(order)

            GraphQLFetchMock
                .expects('runMutation')
                .withExactArgs(Mutation, order)
                .returns(
                    new Promise((resolve) => {
                        resolve({
                            data: {
                                sale: {
                                    savePayment: {
                                        __typename: 'Payment',
                                        token: 'example-token',
                                        anotherProperty: 'anotherProperty',
                                    },
                                },
                            },
                        })
                    }),
                )

            store.dispatch(shoppingCartIndexSaveAction(fromUpSelling)).then(() => {
                expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST })
                expect(store.getActions()[1]).toEqual({
                    type: SHOPPING_CART_SET_TOKEN,
                    token: 'example-token',
                })
                expect(store.getActions()[2]).toEqual({
                    type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                    __typename: 'Payment',
                    token: 'example-token',
                    anotherProperty: 'anotherProperty',
                    fromUpSelling,
                })
            })
        })

        it('from firstStep', () => {
            const middlewares = [thunk]
            const mockStore = configureMockStore(middlewares)

            const store = mockStore({})

            const order = { whatever: 'whatever' }

            const fromUpSelling = false

            ShoppingCartIndexSaveOrderFactoryMock
                .expects('createFromState')
                .returns(order)

            GraphQLFetchMock
                .expects('runMutation')
                .withExactArgs(Mutation, order)
                .returns(
                    new Promise((resolve) => {
                        resolve({
                            data: {
                                sale: {
                                    savePayment: {
                                        __typename: 'Payment',
                                        token: 'example-token',
                                        anotherProperty: 'anotherProperty',
                                    },
                                },
                            },
                        })
                    }),
                )

            store.dispatch(shoppingCartIndexSaveAction(fromUpSelling)).then(() => {
                expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST })
                expect(store.getActions()[1]).toEqual({
                    type: SHOPPING_CART_SET_TOKEN,
                    token: 'example-token',
                })
                expect(store.getActions()[2]).toEqual({
                    type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                    __typename: 'Payment',
                    token: 'example-token',
                    anotherProperty: 'anotherProperty',
                    fromUpSelling,
                })
            })
        })
    })

    it('should dispatch `validationException`', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const order = { whatever: 'whatever' }

        ShoppingCartIndexSaveOrderFactoryMock
            .expects('createFromState')
            .returns(order)

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, order)
            .returns(
                new Promise((resolve) => {
                    resolve({
                        data: {
                            sale: {
                                savePayment: {
                                    __typename: 'ValidationException',
                                    anotherProperty: 'anotherProperty',
                                },
                            },
                        },
                    })
                }),
            )

        store.dispatch(shoppingCartIndexSaveAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({
                type: SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
                __typename: 'ValidationException',
                anotherProperty: 'anotherProperty',
            })
        })
    })

    it('should dispatch `failedReceiveResponse` on failed', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const order = { whatever: 'whatever' }

        ShoppingCartIndexSaveOrderFactoryMock
            .expects('createFromState')
            .returns(order)

        GraphQLFetchMock
            .expects('runMutation')
            .withExactArgs(Mutation, order)
            .returns(
                new Promise((resolve) => {
                    resolve('failed')
                }),
            )

        store.dispatch(shoppingCartIndexSaveAction()).then(() => {
            expect(store.getActions()[0]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_SEND_REQUEST })
            expect(store.getActions()[1]).toEqual({ type: SHOPPING_CART_INDEX_SAVE_FAILED_RECEIVED_RESPONSE })
        })
    })
})
