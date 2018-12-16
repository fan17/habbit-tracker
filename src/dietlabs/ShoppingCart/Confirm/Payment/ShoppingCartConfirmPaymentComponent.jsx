import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCartConfirmPaymentCodContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentCodContainer';
import ShoppingCartConfirmPaymentOnlineContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentOnlineContainer';

export class ShoppingCartConfirmPaymentComponent extends React.Component {
    render() {
        return this.props.isCod ? (
            <ShoppingCartConfirmPaymentCodContainer />
        ) : (
            <ShoppingCartConfirmPaymentOnlineContainer
                token={this.props.token}
            />
        );
    }
}

ShoppingCartConfirmPaymentComponent.propTypes = {
    isCod: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
};

export default ShoppingCartConfirmPaymentComponent;
