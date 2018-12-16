export default class ShoppingCartDeliveryOptions {
    constructor(availableShoppingCartDeliveryOptions, saleShippingId) {
        this.availableShoppingCartDeliveryOptions = availableShoppingCartDeliveryOptions
        this.saleShippingId = saleShippingId || null
    }

    getAvailableForProductsInCart(isPhysicalProduct) {
        return Object.values(this.availableShoppingCartDeliveryOptions).filter(method => (
            (method.onlyVirtual && !isPhysicalProduct)
            || (method.onlyPhysical && isPhysicalProduct)
        ))
    }

    get areShippingDataNeeded() {
        return this.chosen ? this.chosen.doesRequireAddress : false
    }

    get chosen() {
        return this.saleShippingId
            && this.availableShoppingCartDeliveryOptions[this.saleShippingId]
            ? this.availableShoppingCartDeliveryOptions[this.saleShippingId]
            : null
    }
}
