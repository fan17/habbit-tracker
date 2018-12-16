import ShoppingCartDeliveryOption from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOption'
import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'
import ShoppingCartPrice from '../ShoppingCartPrice'

describe('ShoppingCartPrice', () => {
    describe('products', () => {
        it('should be 0 PLN when there are NOT any', () => {
            const price = new ShoppingCartPrice()

            expect(price.products).toBeInstanceOf(Price)
            expect(price.products).toEqual(new Price(0, 'PLN'))
        })

        it('should correctly calculate for 1 product', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = null

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.products).toBeInstanceOf(Price)
            expect(price.products).toEqual(new Price(100, 'PLN'))
        })

        it('should correctly calculate for few products', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(12, 'PLN'), true, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(13, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = null

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.products).toBeInstanceOf(Price)
            expect(price.products).toEqual(new Price(100 * 1 + 12 * 2 + 13 * 1, 'PLN'))
        })
    })

    describe('deliveryOption', () => {
        it('should be 0 PLN when payment method is NOT set and no products', () => {
            const price = new ShoppingCartPrice()

            expect(price.deliveryOption).toBeInstanceOf(Price)
            expect(price.deliveryOption).toEqual(new Price(0, 'PLN'))
        })

        it('should be in products currency when is empty', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'EUR'), true, false, false), 1),
            ]
            const deliveryOption = null

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.deliveryOption).toBeInstanceOf(Price)
            expect(price.deliveryOption).toEqual(new Price(0, 'EUR'))
        })

        it('should correctly calculate when is set', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = new ShoppingCartDeliveryOption(1, 'example', true, true, new Price(8, 'PLN'))

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.deliveryOption).toBeInstanceOf(Price)
            expect(price.deliveryOption).toEqual(new Price(8, 'PLN'))
        })

        it('should be 0 PLN when no products', () => {
            const products = []
            const deliveryOption = new ShoppingCartDeliveryOption(1, 'example', true, true, new Price(8, 'PLN'))

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.deliveryOption).toBeInstanceOf(Price)
            expect(price.deliveryOption).toEqual(new Price(0, 'PLN'))
        })
    })

    describe('total', () => {
        it('should be 0 PLN when there are NOT any', () => {
            const price = new ShoppingCartPrice()

            expect(price.total).toBeInstanceOf(Price)
            expect(price.total).toEqual(new Price(0, 'PLN'))
        })

        it('should correctly calculate for 1 product', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = null

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.total).toBeInstanceOf(Price)
            expect(price.total).toEqual(new Price(100, 'PLN'))
        })

        it('should correctly calculate when is set', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = new ShoppingCartDeliveryOption(1, 'example', true, true, new Price(8, 'PLN'))

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.total).toBeInstanceOf(Price)
            expect(price.total).toEqual(new Price(108, 'PLN'))
        })

        it('should correctly calculate for few products', () => {
            const products = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), true, false, false), 1),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(12, 'PLN'), true, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(13, 'PLN'), true, false, false), 1),
            ]
            const deliveryOption = new ShoppingCartDeliveryOption(1, 'example', true, true, new Price(8, 'PLN'))

            const price = new ShoppingCartPrice(products, deliveryOption)

            expect(price.total).toBeInstanceOf(Price)
            expect(price.total).toEqual(new Price(100 * 1 + 12 * 2 + 13 * 1 + 8, 'PLN'))
        })
    })
})
