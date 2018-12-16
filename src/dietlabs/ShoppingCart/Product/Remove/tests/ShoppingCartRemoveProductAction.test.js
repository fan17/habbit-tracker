import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import { SHOPPING_CART_PRODUCT_REMOVE } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveActionType'
import { shoppingCartProductRemoveAction } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveAction'
import * as ShoppingCartProductSave from 'view/ShoppingCart/Product/Save/ShoppingCartProductSaveAction'

describe('shoppingCartProductRemoveAction', () => {
    let shoppingCartProductSaveActionFake = null
    beforeEach(() => {
        shoppingCartProductSaveActionFake = sinon.fake.returns({ type: 'whatever' })
        sinon.replace(ShoppingCartProductSave, 'shoppingCartProductSaveAction', shoppingCartProductSaveActionFake)
    })
    afterEach(() => {
        sinon.restore()
    })

    it('should remove 1 product', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const productId = 1
        const amount = 1

        const expected = {
            type: SHOPPING_CART_PRODUCT_REMOVE,
            productId,
            amount,
        }
        const result = store.dispatch(shoppingCartProductRemoveAction(productId, amount))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })

    it('should NOT pass `amount` when `amount` is NOT set', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const productId = 1

        const expected = {
            type: SHOPPING_CART_PRODUCT_REMOVE,
            productId,
        }
        const result = store.dispatch(shoppingCartProductRemoveAction(productId))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })

    it('should remove 5 products', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const productId = 1
        const amount = 5

        const expected = {
            type: SHOPPING_CART_PRODUCT_REMOVE,
            productId,
            amount,
        }
        const result = store.dispatch(shoppingCartProductRemoveAction(productId, amount))

        expect(result).toEqual(expected)
        expect(shoppingCartProductSaveActionFake.callCount).toEqual(1)
    })
})
