import Price from 'view/Price/Price'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'
import ShoppingCartUpSell from '../ShoppingCartUpSell'

describe('ShoppingCartProducts', () => {
    describe('products', () => {
        it('should return empty array for when `availableProducts` is empty', () => {
            const rawUpSellProducts = [1]
            const availableProducts = {}

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = []

            expect(shoppingCartProducts.products).toEqual(expected)
        })

        it('should return empty array when `rawUpSellProducts` is empty', () => {
            const rawUpSellProducts = []
            const availableProducts = {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
            }

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = []

            expect(shoppingCartProducts.products).toEqual(expected)
        })

        it('should return one element array', () => {
            const rawUpSellProducts = [1]
            const availableProducts = {
                1: new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false),
                11: new SaleProduct(1, null, new Price(100, 'PLN'), false, false, false),
            }

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(100, 'PLN'), false, false, false), 1),
            ]

            expect(shoppingCartProducts.products).toHaveLength(1)
            expect(shoppingCartProducts.products).toEqual(expected)
        })

        it('should return multiple-positions array', () => {
            const rawUpSellProducts = [1, 2, 10]
            const availableProducts = {
                1: new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false),
                10: new SaleProduct(10, 'example', new Price(10, 'PLN'), false, false, false),
                2: new SaleProduct(2, 'example', new Price(2, 'PLN'), false, false, false),
                8: new SaleProduct(8, 'example', new Price(8, 'PLN'), false, false, false),
            }

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false), 1),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(2, 'PLN'), false, false, false), 3),
                new ShoppingCartProduct(new SaleProduct(10, 'example', new Price(10, 'PLN'), false, false, false), 50),
            ]

            expect(shoppingCartProducts.products).toHaveLength(expected.length)
            expect(shoppingCartProducts.products).toEqual(expected)
        })

        it('should NOT take into account products which are NOT available', () => {
            const rawUpSellProducts = [1, 2, 10]
            const availableProducts = {
                1: new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false),
                2: new SaleProduct(2, 'example', new Price(2, 'PLN'), false, false, false),
                8: new SaleProduct(8, 'example', new Price(8, 'PLN'), false, false, false),
            }

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = [
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false), 1),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(2, 'PLN'), false, false, false), 3),
            ]

            expect(shoppingCartProducts.products).toHaveLength(expected.length)
            expect(shoppingCartProducts.products).toEqual(expected)
        })
    })

    describe('areThereSomeProducts', () => {
        it('should return false', () => {
            const rawUpSellProducts = []
            const availableProducts = {}

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = false

            expect(shoppingCartProducts.areThereSomeProducts).toEqual(expected)
        })

        it('should return true', () => {
            const rawUpSellProducts = [1, 2, 10]
            const availableProducts = {
                1: new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false),
                2: new SaleProduct(2, 'example', new Price(2, 'PLN'), false, false, false),
                8: new SaleProduct(8, 'example', new Price(8, 'PLN'), false, false, false),
            }

            const shoppingCartProducts = new ShoppingCartUpSell(rawUpSellProducts, availableProducts)
            const expected = true

            expect(shoppingCartProducts.areThereSomeProducts).toEqual(expected)
        })
    })
})
