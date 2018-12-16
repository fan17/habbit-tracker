import ValidationError from 'view/Validation/ValidationError'
import { AUTH_LOGOUT } from 'view/Auth/Logout/AuthLogoutActionType'
import {
    SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE,
    SHOPPING_CART_DELIVERY_OPTION_LOAD_FAILED,
    SHOPPING_CART_DELIVERY_OPTION_SET,
} from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionActionType'
import { SHOPPING_CART_PRODUCT_REMOVE } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveActionType'
import { SHOPPING_CART_SET_DELIVERY } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryActionType'
import ShoppingCartDelivery from 'view/ShoppingCart/Delivery/ShoppingCartDelivery'
import {
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
} from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType'
import {
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE,
} from 'view/ShoppingCart/Payment/Method/Load/ShoppingCartPaymentLoadActionType'
import ShoppingCartReducer, { getInitialState, getStateFromLocalStorage, saveToLocalStorage } from '../ShoppingCartReducer'
import { SHOPPING_CART_PRODUCT_ADD } from '../Product/Add/ShoppingCartProductAddActionType'
import { SHOPPING_CART_SET_USER_DATA } from '../UserData/ShoppingCartUserDataActionType'
import ShoppingCartUserData from '../UserData/ShoppingCartUserData'

describe('ShoppingCartReducer', () => {
    beforeEach(() => {
        global.localStorage.clear()
    })

    describe('getInitialState', () => {
        it('should be initialized via localStorage if set', () => {
            const shoppingCart = {
                token: 'example-token',
                products: { 1: 10 },
                saleShippingId: null,
                delivery: new ShoppingCartDelivery('example-name'),
                userData: new ShoppingCartUserData('example-email', true),
                upSellProducts: [],
                userSawUpSelling: false,
                validationError: new ValidationError(),
                shippingOptions: {},
            }
            saveToLocalStorage(shoppingCart)

            expect(JSON.stringify(getStateFromLocalStorage())).toEqual(JSON.stringify({
                token: 'example-token',
                products: { 1: 10 },
                saleShippingId: null,
                delivery: new ShoppingCartDelivery('example-name'),
                userData: new ShoppingCartUserData('example-email', true),
                upSellProducts: [],
            }))
        })
    })

    describe('should update localStorage', () => {
        it('after `addProduct`', () => {
            const initialState = getInitialState()
            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
            }
            const expected = { 1: 1 }

            ShoppingCartReducer(initialState, action)

            expect(JSON.parse(global.localStorage.getItem('shoppingCart')).products).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_PRODUCT_ADD', () => {
        it('should have 1 product in cart', () => {
            const initialState = getInitialState()
            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
            }
            const expected = { 1: 1 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should have 5 products in cart', () => {
            const initialState = getInitialState()
            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
                amount: 5,
            }
            const expected = { 1: 5 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should have 2 products when add 1 product which was previously in cart', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 1 }

            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
            }
            const expected = { 1: 2 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should have 1 product when add 1 product which was NOT previously in cart', () => {
            const initialState = getInitialState()
            initialState.products = { 2: 1 }

            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
            }
            const expected = {
                2: 1,
                1: 1,
            }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should set userSawUpSelling on false', () => {
            const initialState = getInitialState()
            initialState.products = { 2: 1 }
            initialState.userSawUpSelling = true

            const action = {
                type: SHOPPING_CART_PRODUCT_ADD,
                productId: 1,
            }
            const expected = false

            expect(ShoppingCartReducer(initialState, action).userSawUpSelling).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_PRODUCT_REMOVE', () => {
        it('should have empty cart after remove the last product', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 1 }
            const action = {
                type: SHOPPING_CART_PRODUCT_REMOVE,
                productId: 1,
            }
            const expected = {}

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should have 4 products in cart after remove 1 (there were 4 products on start)', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 5 }
            const action = {
                type: SHOPPING_CART_PRODUCT_REMOVE,
                productId: 1,
                amount: 1,
            }
            const expected = { 1: 4 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should have 1 product when remove 1 other product (there were 2 different products on start)', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 1, 2: 1 }

            const action = {
                type: SHOPPING_CART_PRODUCT_REMOVE,
                productId: 2,
            }
            const expected = { 1: 1 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should remove all products with given id', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 10, 2: 2 }

            const action = {
                type: SHOPPING_CART_PRODUCT_REMOVE,
                productId: 1,
            }
            const expected = { 2: 2 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })

        it('should remove product from when removed the last piece', () => {
            const initialState = getInitialState()
            initialState.products = { 1: 1, 2: 2 }

            const action = {
                type: SHOPPING_CART_PRODUCT_REMOVE,
                productId: 1,
                amount: 1,
            }
            const expected = { 2: 2 }

            expect(ShoppingCartReducer(initialState, action).products).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_DELIVERY_OPTION_SET', () => {
        it('should set payment method', () => {
            const initialState = getInitialState()

            const action = {
                type: SHOPPING_CART_DELIVERY_OPTION_SET,
                saleShippingId: 123, // meanse whatever
            }
            const expected = 123

            expect(ShoppingCartReducer(initialState, action).saleShippingId).toEqual(expected)
        })

        it('should overwrite saleShippingId', () => {
            const initialState = getInitialState()
            initialState.saleShippingId = 123
            const action = {
                type: SHOPPING_CART_DELIVERY_OPTION_SET,
                saleShippingId: 456,
            }
            const expected = 456

            expect(ShoppingCartReducer(initialState, action).saleShippingId).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_SET_DELIVERY', () => {
        it('should set', () => {
            const initialState = getInitialState()

            const action = {
                type: SHOPPING_CART_SET_DELIVERY,
                delivery: 'whatever',
            }
            const expected = 'whatever'

            expect(ShoppingCartReducer(initialState, action).delivery).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_SET_USER_DATA', () => {
        it('should set', () => {
            const initialState = getInitialState()

            const action = {
                type: SHOPPING_CART_SET_USER_DATA,
                userData: 'whatever',
            }
            const expected = 'whatever'

            expect(ShoppingCartReducer(initialState, action).userData).toEqual(expected)
        })
    })

    describe('AUTH_LOGOUT', () => {
        it('should reset delivery data when logout', () => {
            const initialState = getInitialState()
            initialState.delivery = new ShoppingCartDelivery('whatever')

            const action = { type: AUTH_LOGOUT }

            expect(ShoppingCartReducer(initialState, action).delivery).toEqual(getInitialState().delivery)
        })

        it('should reset userData data when logout', () => {
            const initialState = getInitialState()
            initialState.userData = new ShoppingCartUserData('whatever')

            const action = { type: AUTH_LOGOUT }

            expect(ShoppingCartReducer(initialState, action).userData).toEqual(getInitialState().userData)
        })
    })

    describe('SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION', () => {
        it('should save ValidationError to store', () => {
            const initialState = getInitialState()

            const action = {
                type: SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
                messages: ['whatever'],
                details: { whatever: 'whatever' },
            }

            expect(ShoppingCartReducer(initialState, action).validationError)
                .toEqual(new ValidationError(['whatever'], { whatever: 'whatever' }))
        })
    })

    describe('SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE', () => {
        it('should handle upSellProducts', () => {
            const initialState = getInitialState()
            initialState.upSellProducts = []

            const action = {
                type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                upSellProducts: [
                    {
                        id: 100,
                        whatever: 'whatever',
                    },
                ],
            }

            expect(ShoppingCartReducer(initialState, action).upSellProducts).toEqual([100])
        })

        it('should set userSawUpSelling on false when fromUpSelling is true', () => {
            const initialState = getInitialState()
            initialState.userSawUpSelling = false

            const action = {
                type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                fromUpSelling: true,
            }
            const expected = true

            expect(ShoppingCartReducer(initialState, action).userSawUpSelling).toEqual(expected)
        })

        it('should NOT change userSawUpSelling when fromUpSelling is false', () => {
            const initialState = getInitialState()
            initialState.userSawUpSelling = 'whatever'

            const action = {
                type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                fromUpSelling: false,
            }
            const expected = 'whatever'

            expect(ShoppingCartReducer(initialState, action).userSawUpSelling).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_DELIVERY_OPTION_LOAD', () => {
        it('should handle `SHOPPING_CART_DELIVERY_OPTION_LOAD_FAILED`', () => {
            const initialState = getInitialState()
            initialState.shippingOptions = 'whatever'

            const action = { type: SHOPPING_CART_DELIVERY_OPTION_LOAD_FAILED }
            const expected = getInitialState().shippingOptions

            expect(ShoppingCartReducer(initialState, action).shippingOptions).toEqual(expected)
        })

        it('should handle `SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE`', () => {
            const initialState = getInitialState()
            const action = {
                type: SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE,
                shippingOptions: 'whatever',
            }
            const expected = 'whatever'

            expect(ShoppingCartReducer(initialState, action).shippingOptions).toEqual(expected)
        })
    })

    describe('SHOPPING_CART_PAYMENT_METHOD_LOAD', () => {
        it('should handle `SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST`', () => {
            const initialState = getInitialState()
            initialState.paymentMethods = 'whatever'

            const action = { type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST }
            const expected = getInitialState().paymentMethods

            expect(ShoppingCartReducer(initialState, action).paymentMethods).toEqual(expected)
        })

        it('should handle `SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE`', () => {
            const initialState = getInitialState()
            initialState.paymentMethods = 'whatever'

            const action = { type: SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE }
            const expected = getInitialState().paymentMethods

            expect(ShoppingCartReducer(initialState, action).paymentMethods).toEqual(expected)
        })

        it('should handle `SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE`', () => {
            const initialState = getInitialState()
            const action = {
                type: SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
                paymentMethods: 'whatever',
            }
            const expected = 'whatever'

            expect(ShoppingCartReducer(initialState, action).paymentMethods).toEqual(expected)
        })
    })
})
