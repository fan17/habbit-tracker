export default class ShoppingCartDeliveryOption {
    constructor(
        id,
        name,
        doesRequireAddress,
        onlyVirtualProducts,
        price,
        countries,
    ) {
        this.id = id
        this.name = name
        this.doesRequireAddress = doesRequireAddress || false
        this.onlyVirtual = Boolean(onlyVirtualProducts)
        this.onlyPhysical = !this.onlyVirtual
        this.price = price
        this.countries = countries || {}
    }
}
