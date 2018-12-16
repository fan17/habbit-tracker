import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'
import ShoppingCartProductOrder from '../ShoppingCartProductOrder'

describe('ShoppingCartProductOrder', () => {
    describe('token', () => {
        it('should NOT contain if NOT set', () => {
            const order = new ShoppingCartProductOrder()

            expect(order.token).toEqual(undefined)
        })

        it('should contain', () => {
            const token = 'example-token'
            const products = []

            const order = new ShoppingCartProductOrder(token, products)

            expect(order.token).not.toEqual(undefined)
            expect(order.token).toBe('example-token')
        })
    })

    describe('products', () => {
        it('should contain even if NOT set', () => {
            const order = new ShoppingCartProductOrder()

            expect(order.products).not.toEqual(undefined)
            expect(order.products).toEqual([])
        })

        it('should contain', () => {
            const token = 'example-token'
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 2),
            ]
            const expected = [
                { amount: 2, id: 1 },
            ]

            const order = new ShoppingCartProductOrder(token, products)

            expect(order.products).not.toEqual(undefined)
            expect(order.products).toEqual(expected)
        })
    })
})
