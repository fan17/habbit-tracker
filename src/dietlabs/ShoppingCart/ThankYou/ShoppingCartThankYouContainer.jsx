import { connect } from 'react-redux';
import ShoppingCartThankYouComponent from 'components/ShoppingCart/ThankYou/ShoppingCartThankYouComponent';
import { paymentLoadByToken } from 'view/Payment/Load/ByToken/PaymentLoadByTokenAction';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    loadPayment: token => dispatch(paymentLoadByToken(token)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartThankYouComponent);
