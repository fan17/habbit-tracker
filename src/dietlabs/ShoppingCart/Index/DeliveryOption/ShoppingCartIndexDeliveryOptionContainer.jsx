import { connect } from 'react-redux'
import ShoppingCartDeliveryOptionsFactory from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOptionsFactory'
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory'
import ShoppingCartIndexDeliveryOptionComponent from 'components/ShoppingCart/Index/ShoppingCartIndexDeliveryOptionComponent'
import ValidationError from 'view/Validation/ValidationError'
import { shoppingCartDeliveryOptionSetAction } from 'view/ShoppingCart/Delivery/Option/Set/ShoppingCartDeliveryOptionSetAction'
import { shoppingCartSetDeliveryAction } from 'view/ShoppingCart/Delivery/ShoppingCartDeliveryAction'
import { shoppingCartSetUserDataAction } from 'view/ShoppingCart/UserData/ShoppingCartUserDataAction'

const mapStateToProps = (state) => {
    const deliveryOptions = ShoppingCartDeliveryOptionsFactory.createFromState(state)
    const isPhysicalProduct = ShoppingCartProductsFactory.createFromState(state).isPhysicalProduct

    return {
        saleShippingId: deliveryOptions.saleShippingId,
        isLoggedIn: Boolean(state.auth.token),
        deliveryOptions: Object.values(deliveryOptions.getAvailableForProductsInCart(isPhysicalProduct)),
        areShippingDataNeeded: deliveryOptions.areShippingDataNeeded,
        delivery: state.shoppingCart.delivery,
        userData: state.shoppingCart.userData,
        validationError: ValidationError.createFromObject(state.shoppingCart.validationError),
        chosenDeliveryOption: deliveryOptions.chosen,
    }
}

const mapDispatchToProps = dispatch => ({
    setDeliveryOption: saleShippingId => dispatch(shoppingCartDeliveryOptionSetAction(saleShippingId)),
    setDelivery: delivery => dispatch(shoppingCartSetDeliveryAction(delivery)),
    setUserData: userData => dispatch(shoppingCartSetUserDataAction(userData)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShoppingCartIndexDeliveryOptionComponent)
