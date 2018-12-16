export default class ShoppingCartDelivery {
    constructor(name, address, postalCode, city, countryCode, phone) {
        this.name = name || ''
        this.address = address || ''
        this.postalCode = postalCode || ''
        this.city = city || ''
        this.countryCode = countryCode || ''
        this.phone = phone || ''
    }
}
