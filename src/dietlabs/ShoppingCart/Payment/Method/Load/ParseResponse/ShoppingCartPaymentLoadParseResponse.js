import ShoppingCartPaymentMethod from 'view/ShoppingCart/Payment/Method/ShoppingCartPaymentMethod'
import ShoppingCartPaymentMethodOption from 'view/ShoppingCart/Payment/Method/Option/ShoppingCartPaymentMethodOption'

export const shoppingCartPaymentMethodLoadParseResponse = (rawOperators) => {
    const result = []

    for (let i = 0; i < rawOperators.length; i++) {
        const operator = rawOperators[i]

        if (operator.methods) {
            for (let j = 0; j < operator.methods.length; j++) {
                const method = operator.methods[j]
                const options = []
                if (method.channels.length) {
                    for (let k = 0; k < method.channels.length; k++) {
                        const channel = method.channels[k]

                        if (channel.standalone) {
                            result.push(
                                new ShoppingCartPaymentMethod(
                                    method.id,
                                    channel.id,
                                    channel.name,
                                    [],
                                ),
                            )
                        } else {
                            options.push(
                                new ShoppingCartPaymentMethodOption(
                                    channel.id,
                                    channel.name,
                                ),
                            )
                        }
                    }
                }
                if (!method.channels.length || options.length) {
                    result.push(
                        new ShoppingCartPaymentMethod(
                            method.id,
                            undefined,
                            method.name,
                            options,
                        ),
                    )
                }
            }
        }
    }

    return result
}
