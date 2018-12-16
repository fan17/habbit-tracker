import Price from 'view/Price/Price'

export default class ShoppingCartPrice {
    constructor(products, deliveryOption) {
        products = products || []
        const currency = products[0] ? products[0].price.currency : 'PLN'
        this.products = products.reduce((prev, current) => prev.add(current.sumPrice), new Price(0, currency))

        this.deliveryOption = deliveryOption && products.length ? deliveryOption.price : new Price(0, currency)

        this.total = this.products.add(this.deliveryOption)
    }
}
