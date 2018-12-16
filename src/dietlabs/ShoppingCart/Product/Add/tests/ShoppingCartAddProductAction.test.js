import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import * as ShoppingCartProductSave from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveAction'
import * as smartRemove from 'view/ShoppingCart/Product/GetToSmartRemove/ShoppingCartProductGetToSmartRemove'
import { shoppingCartProductAddAction } from '../ShoppingCartProductAddAction'
import { SHOPPING_CART_PRODUCT_ADD } from '../ShoppingCartProductAddActionType'

describe('ShoppingCartAddProductActionAction', () => {
    let shoppingCartProductSaveActionFake = null
    let ShoppingCartProductGetToSmartRemoveFake = null
    beforeEach(() => {
        shoppingCartProductSaveActionFake = sinon.fake.returns({ type: 'whatever' })
        sinon.replace(ShoppingCartProductSave, 'shoppingCartProductSaveAction', shoppingCartProductSaveActionFake)

        ShoppingCartProductGetToSmartRemoveFake = sinon.fake.returns([])
        sinon.replace(smartRemove, 'shoppingCartProductGetToSmartRemove', ShoppingCartProductGetToSmartRemoveFake)
    })
    afterEach(() => {
        sinon.restore()
    })

    it('should add 1 product', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                products: {},
            },
            saleProducts: {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
            },
        })

        const productId = 1
        const amount = 1

        const expected = {
            type: SHOPPING_CART_PRODUCT_ADD,
            productId,
            amount,
        }
        const result = store.dispatch(shoppingCartProductAddAction(productId, amount))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })

    it('should add 1 product when `amount` is NOT set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                products: {},
            },
            saleProducts: {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
            },
        })

        const productId = 1

        const expected = {
            type: SHOPPING_CART_PRODUCT_ADD,
            productId,
            amount: 1,
        }
        const result = store.dispatch(shoppingCartProductAddAction(productId))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })

    it('should add 5 products', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                products: {},
            },
            saleProducts: {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
            },
        })

        const productId = 1
        const amount = 5

        const expected = {
            type: SHOPPING_CART_PRODUCT_ADD,
            productId,
            amount,
        }
        const result = store.dispatch(shoppingCartProductAddAction(productId, amount))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })

    it('should NOT save products', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({
            shoppingCart: {
                products: {},
            },
            saleProducts: {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
            },
        })

        const productId = 1

        store.dispatch(shoppingCartProductAddAction(productId, 1, false))

        expect(shoppingCartProductSaveActionFake.callCount).toEqual(0)
    })
})
