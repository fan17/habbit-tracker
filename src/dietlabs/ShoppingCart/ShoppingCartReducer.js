import ValidationError from 'view/Validation/ValidationError'
import { AUTH_LOGOUT } from 'view/Auth/Logout/AuthLogoutActionType'
import {
    SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE,
    SHOPPING_CART_DELIVERY_OPTION_LOAD_FAILED,
    SHOPPING_CART_DELIVERY_OPTION_SET,
} from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionActionType'
import { SHOPPING_CART_SET_TOKEN } from 'view/ShoppingCart/Token/ShoppingCardTokenActionType'
import { SHOPPING_CART_PRODUCT_REMOVE } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveActionType'
import { SHOPPING_CART_SET_DELIVERY } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryActionType'
import ShoppingCartDelivery from 'view/ShoppingCart/Delivery/ShoppingCartDelivery'
import {
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE,
    SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE,
} from 'view/ShoppingCart/Payment/Method/Load/ShoppingCartPaymentLoadActionType'
import {
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
} from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType'
import { SHOPPING_CART_CLEAR } from 'view/ShoppingCart/Clear/ShoppingCartClearActionType'
import { SHOPPING_CART_PRODUCT_ADD } from './Product/Add/ShoppingCartProductAddActionType'
import { SHOPPING_CART_SET_USER_DATA } from './UserData/ShoppingCartUserDataActionType'
import ShoppingCartUserData from './UserData/ShoppingCartUserData'

const LOCAL_STORAGE_KEY = 'shoppingCart'

export function getInitialState() {
    return {
        token: null,
        products: {},
        saleShippingId: null,
        delivery: new ShoppingCartDelivery(),
        userData: new ShoppingCartUserData(),
        validationError: new ValidationError(),
        upSellProducts: [],
        userSawUpSelling: false,
        shippingOptions: {},
        paymentMethods: [],
    }
}

export function getStateFromLocalStorage() {
    let result = {}

    if (
        window
        && window.localStorage
        && window.localStorage.getItem(LOCAL_STORAGE_KEY)
    ) {
        result = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    }

    return result
}

export function saveToLocalStorage(result) {
    if (
        window
        && window.localStorage
    ) {
        const resultToStore = {
            token: result.token,
            products: JSON.parse(JSON.stringify(result.products)),
            saleShippingId: result.saleShippingId,
            delivery: JSON.parse(JSON.stringify(result.delivery)),
            userData: JSON.parse(JSON.stringify(result.userData)),
            upSellProducts: JSON.parse(JSON.stringify(result.upSellProducts)),
        }

        if (Object.keys(resultToStore).length) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resultToStore))
        } else {
            window.localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
    }
}

export default function ShoppingCartReducer(state, action) {
    let result = state ? { ...state } : Object.assign(getInitialState(), getStateFromLocalStorage())

    switch (action.type) {
        case SHOPPING_CART_PRODUCT_ADD:
            if (result.products[action.productId] === undefined) {
                result.products[action.productId] = 0
            }
            result.products[action.productId] += action.amount ? action.amount : 1
            result.userSawUpSelling = false
            break
        case SHOPPING_CART_PRODUCT_REMOVE:
            if (result.products[action.productId] !== undefined) {
                if (
                    result.products[action.productId] <= action.amount
                || action.amount === undefined
                ) {
                    delete result.products[action.productId]
                } else {
                    result.products[action.productId] -= action.amount
                }
            }
            break
        case SHOPPING_CART_SET_TOKEN:
            result.token = action.token
            break
        case SHOPPING_CART_DELIVERY_OPTION_SET:
            result.saleShippingId = Number(action.saleShippingId)
            break
        case SHOPPING_CART_SET_DELIVERY:
            result.delivery = action.delivery
            break
        case SHOPPING_CART_SET_USER_DATA:
            result.userData = action.userData
            break
        case AUTH_LOGOUT:
            result.delivery = getInitialState().delivery
            result.userData = getInitialState().userData
            break
        case SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION:
            result.validationError = ValidationError.createFromObject(action)
            break
        case SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE:
            if (action.upSellProducts !== undefined) {
                result.upSellProducts = action.upSellProducts.map(product => product.id)
            }
            if (action.fromUpSelling) {
                result.userSawUpSelling = true
            }
            break
        case SHOPPING_CART_DELIVERY_OPTION_LOAD_FAILED:
            result.shippingOptions = getInitialState().shippingOptions
            break
        case SHOPPING_CART_DELIVERY_OPTION_LOAD_RECEIVE_RESPONSE:
            result.shippingOptions = action.shippingOptions
            break
        case SHOPPING_CART_PAYMENT_METHOD_LOAD_SEND_REQUEST:
        case SHOPPING_CART_PAYMENT_METHOD_LOAD_FAILED_RECEIVE_RESPONSE:
            result.paymentMethods = getInitialState().paymentMethods
            break
        case SHOPPING_CART_PAYMENT_METHOD_LOAD_SUCCESS_RECEIVE_RESPONSE:
            result.paymentMethods = action.paymentMethods
            break
            // TODO
        case SHOPPING_CART_CLEAR:
            result = getInitialState()
            break
    }

    saveToLocalStorage(result)

    return result
}
