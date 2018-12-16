export const shoppingCartProductGetToSmartRemove = (saleProduct, currentCartProducts) => {
    const result = []
    if (!saleProduct.isPhysical) {
        currentCartProducts.map((productInCart) => {
            if (
                !productInCart.isPhysical
                && (
                    (
                        productInCart.saleProduct.containsDiet
                        && saleProduct.containsDiet
                        && (
                            productInCart.saleProduct.containsWorkout === saleProduct.containsWorkout
                            || !productInCart.saleProduct.containsWorkout
                        )
                    )
                    || (
                        productInCart.saleProduct.containsWorkout
                        && saleProduct.containsWorkout
                        && (
                            productInCart.saleProduct.containsDiet === saleProduct.containsDiet
                            || !productInCart.saleProduct.containsDiet
                        )
                    )
                )
            ) {
                result.push(productInCart)
            }
        })
    }

    return result
}
