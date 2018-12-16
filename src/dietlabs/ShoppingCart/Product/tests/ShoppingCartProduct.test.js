import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'

describe('ShoppingCartProduct', () => {
    it('should throw when saleProduct is NOT instance of SaleProduct', () => {
        expect(() => new ShoppingCartProduct('whatever', 10)).toThrowError()
    })

    describe('sumPrice', () => {
        it('should return 0 when price 0', () => {
            const price = new Price(0, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, true, false, false), 10)

            expect(product.sumPrice).toEqual(new Price(0 * 10, 'PLN'))
        })

        it('should calculate sumPrice', () => {
            const price = new Price(12, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, true, false, false), 10)

            expect(product.sumPrice).toEqual(new Price(12 * 10, 'PLN'))
        })
    })

    describe('isItPossibleToBuyMoreThanOne', () => {
        it('should be true if product is physical', () => {
            const price = new Price(12, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, true, false, false), 10)

            expect(product.isItPossibleToBuyMoreThanOne).toBeTruthy()
        })

        it('should be false if product is virtual', () => {
            const price = new Price(12, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, false, false, false), 10)

            expect(product.isItPossibleToBuyMoreThanOne).toBeFalsy()
        })
    })

    describe('amount', () => {
        it('1 when amount is more than 1 & product is virtual', () => {
            const price = new Price(12, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, false, false, false), 10)

            expect(product.amount).toBe(1)
        })

        it('5 when amount is 5 & product is physical', () => {
            const price = new Price(12, 'PLN')
            const product = new ShoppingCartProduct(new SaleProduct(11, 'example-name', price, true, false, false), 5)

            expect(product.isItPossibleToBuyMoreThanOne).toBeTruthy()

            expect(product.amount).toBe(5)
        })
    })
})
