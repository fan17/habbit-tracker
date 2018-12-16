import ShoppingCartDeliveryOption from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOption'
import Price from 'view/Price/Price'
import ShoppingCartDeliveryOptions from '../ShoppingCartDeliveryOptions'

describe('ShoppingCartDeliveryOptions', () => {
    describe('getAvailableForProductsInCart', () => {
        it('should return methods available only for virtual products', () => {
            const available = {
                10: new ShoppingCartDeliveryOption(10, 'example', true, true, new Price(10, 'EUR')),
                15: new ShoppingCartDeliveryOption(15, 'example', false, false, new Price(15, 'EUR')),
            }
            const saleShippingId = undefined

            const expected = [available[10]]

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.getAvailableForProductsInCart(false)).toEqual(expected)
        })

        it('should return methods available only for NON virtual products', () => {
            const available = {
                10: new ShoppingCartDeliveryOption(10, 'example', true, true, new Price(10, 'EUR')),
                15: new ShoppingCartDeliveryOption(15, 'example', false, false, new Price(15, 'EUR')),
            }
            const saleShippingId = undefined

            const expected = [available[15]]

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.getAvailableForProductsInCart(true)).toEqual(expected)
        })
    })

    describe('areShippingDataNeeded', () => {
        it('should return false when saleShippingId is NOT set', () => {
            const available = []
            const saleShippingId = undefined

            const expected = false

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.areShippingDataNeeded).toBe(expected)
        })

        it('should return false when saleShippingId is set but option is unavailable', () => {
            const available = []
            const saleShippingId = 10

            const expected = false

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.areShippingDataNeeded).toBe(expected)
        })

        it('should return true if method require address', () => {
            const available = {
                10: new ShoppingCartDeliveryOption(10, 'example', true, false, new Price(10, 'EUR')),
                15: new ShoppingCartDeliveryOption(15, 'example', false, false, new Price(15, 'EUR')),
            }
            const saleShippingId = 10

            const expected = true

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.areShippingDataNeeded).toBe(expected)
        })

        it('should return false if method does NOT require address', () => {
            const available = {
                10: new ShoppingCartDeliveryOption(10, 'example', true, false, new Price(10, 'EUR')),
                15: new ShoppingCartDeliveryOption(15, 'example', false, false, new Price(15, 'EUR')),
            }
            const saleShippingId = 15

            const expected = false

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.areShippingDataNeeded).toBe(expected)
        })
    })

    describe('chosen', () => {
        it('should return null when saleShippingId is NOT set', () => {
            const available = []
            const saleShippingId = undefined

            const expected = null

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.chosen).toBe(expected)
        })

        it('should return null when saleShippingId is set but option is unavailable', () => {
            const available = []
            const saleShippingId = 10

            const expected = null

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.chosen).toBe(expected)
        })

        it('should return correct value', () => {
            const available = {
                10: new ShoppingCartDeliveryOption(10, 'example', true, false, new Price(10, 'EUR')),
                15: new ShoppingCartDeliveryOption(15, 'example', true, false, new Price(15, 'EUR')),
            }
            const saleShippingId = 10

            const expected = available[10]

            const deliveryOptions = new ShoppingCartDeliveryOptions(available, saleShippingId)

            expect(deliveryOptions.chosen).toBe(expected)
        })
    })
})
