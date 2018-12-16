import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'

export default class ShoppingCartProducts {
    constructor(rawCartProducts, availableProducts) {
        rawCartProducts = rawCartProducts || {}
        availableProducts = availableProducts || {}

        this.initProducts(rawCartProducts, availableProducts)
    }

    initProducts(rawCartProducts, availableProducts) {
        this.products = Object.keys(rawCartProducts).reduce((prev, productId) => (
            availableProducts[productId] !== undefined
                ? prev.concat(
                    new ShoppingCartProduct(
                        availableProducts[productId],
                        rawCartProducts[productId],
                    ),
                )
                : prev
        ), [])
    }

    get isPhysicalProduct() {
        return Boolean(this.products.filter(product => product.isPhysical).length)
    }

    get areThereSomeProducts() {
        return Boolean(this.products.length)
    }
}
