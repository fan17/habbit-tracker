import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SHOPPING_CART_SET_DELIVERY } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryActionType'
import { shoppingCartSetDeliveryAction } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryAction'

describe('ShoppingCartDeliveryAction', () => {
    describe('ShoppingCartSetDeliveryAction', () => {
        it('should set delivery', () => {
            const middlewares = [thunk]
            const mockStore = configureMockStore(middlewares)

            const store = mockStore({})

            const delivery = 'whatever'

            const expected = {
                type: SHOPPING_CART_SET_DELIVERY,
                delivery,
            }
            const result = store.dispatch(shoppingCartSetDeliveryAction(delivery))

            expect(result).toEqual(expected)
        })
    })
})
