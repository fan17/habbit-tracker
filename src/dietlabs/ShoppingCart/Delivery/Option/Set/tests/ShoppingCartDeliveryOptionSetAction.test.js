import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shoppingCartDeliveryOptionSetAction } from 'view/ShoppingCart/Delivery/Option/Set/ShoppingCartDeliveryOptionSetAction'
import { SHOPPING_CART_DELIVERY_OPTION_SET } from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionActionType'

describe('shoppingCartDeliveryOptionSetAction', () => {
    it('should set delivery option', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const saleShippingId = 'online'

        const expected = {
            type: SHOPPING_CART_DELIVERY_OPTION_SET,
            saleShippingId,
        }
        const result = store.dispatch(shoppingCartDeliveryOptionSetAction(saleShippingId))

        expect(result).toEqual(expected)
    })
})
