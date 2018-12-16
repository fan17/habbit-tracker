import { shoppingCartProductGetToSmartRemove } from 'view/ShoppingCart/Product/GetToSmartRemove/ShoppingCartProductGetToSmartRemove'
import SaleProduct from 'view/Sale/Product/SaleProduct'
import Price from 'view/Price/Price'
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'

describe('ShoppingCartProductGetToSmartRemove', () => {
    const diet30 = new SaleProduct(1, 'diet30', new Price(10, 'PLN'), false, true, false)
    const diet60 = new SaleProduct(2, 'diet30', new Price(20, 'PLN'), false, true, false)

    const training30 = new SaleProduct(10, 'training30', new Price(15, 'PLN'), false, false, true)
    const training60 = new SaleProduct(11, 'training60', new Price(25, 'PLN'), false, false, true)

    const dietAndTraining30 = new SaleProduct(20, 'dietAndTraining30', new Price(22, 'PLN'), false, true, true)

    const diet30AndPhysicalProduct = new SaleProduct(30, 'diet30AndPhysicalProduct', new Price(40, 'PLN'), true, true, false)
    const training30AndPhysicalProduct = new SaleProduct(31, 'training30AndPhysicalProduct', new Price(41, 'PLN'), true, false, true)
    const dietAndTraining30AndPhysicalProduct = new SaleProduct(32, 'dietAndTraining30AndPhysicalProduct', new Price(42, 'PLN'), true, true, true)

    const physicalProduct = new SaleProduct(40, 'physicalProduct', new Price(8, 'PLN'), true, false, false)

    it('should return empty array if cartProducts is empty', () => {
        const saleProduct = physicalProduct
        const cartProducts = []

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return empty array if saleProduct is physical', () => {
        const saleProduct = diet30AndPhysicalProduct
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return diet30 if saleProduct is diet60', () => {
        const saleProduct = diet60
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(1)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(diet30, 1),
        ])
    })

    it('should return training30 if saleProduct is training60', () => {
        const saleProduct = training60
        const cartProducts = [
            new ShoppingCartProduct(
                training30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(1)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(training30, 1),
        ])
    })

    it('should return empty array when diet30 was in cart and training60 has been added', () => {
        const saleProduct = training60
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return diet30 when diet30 was in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(1)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(diet30, 1),
        ])
    })

    it('should return empty array when training30 was in cart and diet30 has been added', () => {
        const saleProduct = training30
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return training30 when training30 was in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                training30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(1)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(training30, 1),
        ])
    })

    it('should return empty array when dietAndTraining30 was in cart and diet60 has been added', () => {
        const saleProduct = diet60
        const cartProducts = [
            new ShoppingCartProduct(
                dietAndTraining30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return empty array when dietAndTraining30 was in cart and training60 has been added', () => {
        const saleProduct = training60
        const cartProducts = [
            new ShoppingCartProduct(
                dietAndTraining30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return diet30 & training30 when diet30 & training30 were in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                diet30,
                1,
            ),
            new ShoppingCartProduct(
                training30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(2)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(diet30, 1),
            new ShoppingCartProduct(training30, 1),
        ])
    })

    it('should return empty array when diet30AndPhysicalProduct was in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                diet30AndPhysicalProduct,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return empty array when training30AndPhysicalProduct was in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                training30AndPhysicalProduct,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return empty array when dietAndTraining30AndPhysicalProduct was in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                dietAndTraining30AndPhysicalProduct,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(0)
    })

    it('should return diet30 when dietAndTraining30AndPhysicalProduct and diet30 were in cart and dietAndTraining30 has been added', () => {
        const saleProduct = dietAndTraining30
        const cartProducts = [
            new ShoppingCartProduct(
                dietAndTraining30AndPhysicalProduct,
                1,
            ),
            new ShoppingCartProduct(
                diet30,
                1,
            ),
        ]

        const productsToRemove = shoppingCartProductGetToSmartRemove(saleProduct, cartProducts)

        expect(productsToRemove).toHaveLength(1)
        expect(productsToRemove).toEqual([
            new ShoppingCartProduct(diet30, 1),
        ])
    })
})
