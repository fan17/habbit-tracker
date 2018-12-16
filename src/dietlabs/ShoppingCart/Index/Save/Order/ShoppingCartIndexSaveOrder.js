export default class ShoppingCartIndexSaveOrder {
    constructor(token, products, saleShippingId, delivery, userData) {
        if (token) {
            this.token = token
        }

        products = products || []
        this.products = products.reduce(
            (prev, current) => prev.concat({
                id: current.id,
                amount: current.amount,
            }),
            [],
        )
        this.saleShippingId = saleShippingId || null

        if (delivery) {
            this.name = delivery.name || ''
            this.city = delivery.city || ''
            this.postalCode = delivery.postalCode || ''
            this.address = delivery.address || ''
            this.phone = delivery.phone || ''
            this.countryCode = delivery.countryCode || 'PL'
        }

        if (userData) {
            this.email = userData.email || ''
            this.acceptConditions = Boolean(userData.acceptConditions)
        }
    }
}
