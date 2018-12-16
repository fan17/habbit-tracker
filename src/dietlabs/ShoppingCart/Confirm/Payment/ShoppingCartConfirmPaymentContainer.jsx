import { connect } from 'react-redux';
import ShoppingCartConfirmPaymentComponent from 'components/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentComponent';
import { shoppingCartPaymentMethodsLoadAction } from 'view/ShoppingCart/Payment/Method/Load/ShoppingCartPaymentLoadAction';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isCod: state.payment.current.requiresDelivery,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(shoppingCartPaymentMethodsLoadAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartConfirmPaymentComponent);
