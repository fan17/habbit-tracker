import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct'

export default class ShoppingCartUpSell {
    constructor(rawUpSellProduct, availableProducts) {
        rawUpSellProduct = rawUpSellProduct || []
        availableProducts = availableProducts || {}

        this.initProducts(rawUpSellProduct, availableProducts)
    }

    initProducts(rawUpSellProduct, availableProducts) {
        this.products = rawUpSellProduct.reduce((prev, productId) => (
            availableProducts[productId] !== undefined
                ? prev.concat(
                    new ShoppingCartProduct(
                        availableProducts[productId],
                        1,
                    ),
                )
                : prev
        ), [])
    }

    get areThereSomeProducts() {
        return Boolean(this.products.length)
    }
}
