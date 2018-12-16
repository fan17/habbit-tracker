export default class ShoppingCartPaymentMethod {
    constructor(methodId, channelId, name, options) {
        this.methodId = methodId
        this.channelId = channelId || undefined
        this.name = name
        this.options = options || []
    }

    get hasOptions() {
        return Boolean(this.options.length)
    }
}
