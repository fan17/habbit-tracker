import { connect } from 'react-redux';
import ShoppingCartConfirmPaymentOnlineComponent from 'components/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentOnlineComponent';
import { shoppingCartPaymentMethodsLoadAction } from 'view/ShoppingCart/Payment/Method/Load/ShoppingCartPaymentLoadAction';
import { shoppingCartPaymentMakeAction } from 'view/ShoppingCart/Confirm/Payment/Make/ShoppingCartPaymentMakeAction';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    methods: state.shoppingCart.paymentMethods,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(shoppingCartPaymentMethodsLoadAction()),
    make: (token, method, channel) => dispatch(shoppingCartPaymentMakeAction(token, method, channel)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartConfirmPaymentOnlineComponent);
