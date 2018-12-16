import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'
import ShoppingCartIndexSaveOrder from 'view/ShoppingCart/Index/Save/Order/ShoppingCartIndexSaveOrder'

describe('ShoppingCartIndexSaveOrder', () => {
    describe('token', () => {
        it('should NOT contain if NOT set', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.token).toEqual(undefined)
        })

        it('should contain', () => {
            const token = 'example-token'
            const products = []

            const order = new ShoppingCartIndexSaveOrder(token, products)

            expect(order.token).not.toEqual(undefined)
            expect(order.token).toBe('example-token')
        })
    })

    describe('products', () => {
        it('should contain even if NOT set', () => {
            const order = new ShoppingCartIndexSaveOrder()

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

            const order = new ShoppingCartIndexSaveOrder(token, products)

            expect(order.products).not.toEqual(undefined)
            expect(order.products).toEqual(expected)
        })
    })

    describe('saleShippingId', () => {
        it('should be null', () => {
            const order = new ShoppingCartIndexSaveOrder()
            expect(order.saleShippingId).toEqual(null)
        })

        it('should be filled', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, 100)
            expect(order.saleShippingId).toEqual(100)
        })
    })

    describe('name', () => {
        it('should be undefined when delivery is not needed', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.name).toEqual(undefined)
        })

        it('should be empty string when delivery is needed but is not set', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, { whatever: 'whatever' })

            expect(order.name).toEqual('')
        })

        it('should be filled', () => {
            const delivery = { name: 'example name' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, delivery)

            expect(order.name).toEqual(delivery.name)
        })
    })

    describe('address', () => {
        it('should be undefined when delivery is not needed', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.address).toEqual(undefined)
        })

        it('should be empty string when delivery is needed but is not set', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, { whatever: 'whatever' })

            expect(order.address).toEqual('')
        })

        it('should be filled', () => {
            const delivery = { address: 'example address' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, delivery)

            expect(order.address).toEqual(delivery.address)
        })
    })

    describe('postalCode', () => {
        it('should be undefined when delivery is not needed', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.postalCode).toEqual(undefined)
        })

        it('should be empty string when delivery is needed but is not set', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, { whatever: 'whatever' })

            expect(order.postalCode).toEqual('')
        })

        it('should be filled', () => {
            const delivery = { postalCode: '12312' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, delivery)

            expect(order.postalCode).toEqual(delivery.postalCode)
        })
    })

    describe('city', () => {
        it('should be undefined when delivery is not needed', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.city).toEqual(undefined)
        })

        it('should be empty string when delivery is needed but is not set', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, { whatever: 'whatever' })

            expect(order.city).toEqual('')
        })

        it('should be filled', () => {
            const delivery = { city: 'example city' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, delivery)

            expect(order.city).toEqual(delivery.city)
        })
    })

    describe('phone', () => {
        it('should be undefined when delivery is not needed', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.phone).toEqual(undefined)
        })

        it('should be empty string when delivery is needed but is not set', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, { whatever: 'whatever' })

            expect(order.phone).toEqual('')
        })

        it('should be filled', () => {
            const delivery = { phone: '123123123' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, delivery)

            expect(order.phone).toEqual(delivery.phone)
        })
    })

    describe('email', () => {
        it('should be undefined when userData is NOT set', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.email).toEqual(undefined)
        })

        it('should be empty string when userData does NOT contain', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, null, { whatever: 'whatever' })

            expect(order.email).toEqual('')
        })

        it('should be filled', () => {
            const userData = { email: 'test@dietlabs.pl' }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, null, userData)

            expect(order.email).toEqual(userData.email)
        })
    })

    describe('acceptConditions', () => {
        it('should be undefined when userData is NOT set', () => {
            const order = new ShoppingCartIndexSaveOrder()

            expect(order.acceptConditions).toEqual(undefined)
        })

        it('should be false when userData does NOT contain', () => {
            const order = new ShoppingCartIndexSaveOrder(null, null, null, null, { whatever: 'whatever' })

            expect(order.acceptConditions).toEqual(false)
        })

        it('should be when userData.acceptConditions = true', () => {
            const userData = { acceptConditions: true }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, null, userData)

            expect(order.acceptConditions).toEqual(userData.acceptConditions)
        })

        it('should be when userData.acceptConditions = false', () => {
            const userData = { acceptConditions: false }
            const order = new ShoppingCartIndexSaveOrder(null, null, null, null, userData)

            expect(order.acceptConditions).toEqual(userData.acceptConditions)
        })
    })
})
