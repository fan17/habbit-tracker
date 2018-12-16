import { connect } from 'react-redux';
import ShoppingCartConfirmIsDeliveryChosenComponent from 'components/ShoppingCart/Confirm/ShoppingCartConfirmIsDeliveryChosenComponent';

const mapStateToProps = state => ({
    isChosen: state.payment.current.requiresDelivery,
});

const mapDispatchToProps = () => ({});

const component = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartConfirmIsDeliveryChosenComponent);

export default component;
