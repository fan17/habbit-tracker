import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shoppingCartSetUserDataAction } from 'view/ShoppingCart/UserData/ShoppingCartUserDataAction'
import { SHOPPING_CART_SET_USER_DATA } from '../ShoppingCartUserDataActionType'
import ShoppingCartUserData from '../ShoppingCartUserData'

describe('ShoppingCartDeliveryAction', () => {
    describe('ShoppingCartSetDeliveryAction', () => {
        it('should set userData', () => {
            const middlewares = [thunk]
            const mockStore = configureMockStore(middlewares)

            const store = mockStore({})

            const userData = new ShoppingCartUserData(
                'email-example',
                true,
            )

            const expected = {
                type: SHOPPING_CART_SET_USER_DATA,
                userData,
            }
            const result = store.dispatch(shoppingCartSetUserDataAction(userData))

            expect(result).toEqual(expected)
        })
    })
})
