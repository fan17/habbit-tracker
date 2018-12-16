export default class ShoppingCartUserData {
    constructor(email, acceptConditions) {
        this.email = email || ''
        this.acceptConditions = Boolean(acceptConditions)
    }
}
