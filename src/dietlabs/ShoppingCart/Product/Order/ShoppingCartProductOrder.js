export default class ShoppingCartProductOrder {
    constructor(token, products) {
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
    }
}
