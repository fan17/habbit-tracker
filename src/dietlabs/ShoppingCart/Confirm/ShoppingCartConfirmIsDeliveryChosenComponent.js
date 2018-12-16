import React from 'react'
import PropTypes from 'prop-types'
import ShoppingCartConfirmDeliveryContainer from 'view/ShoppingCart/Confirm/ShoppingCartConfirmDeliveryContainer'

export class ShoppingCartConfirmIsDeliveryChosenComponent extends React.Component {
    render() {
        return this.props.isChosen ? <ShoppingCartConfirmDeliveryContainer /> : ''
    }
}

ShoppingCartConfirmIsDeliveryChosenComponent.propTypes = {
    isChosen: PropTypes.bool.isRequired,
}

export default ShoppingCartConfirmIsDeliveryChosenComponent
