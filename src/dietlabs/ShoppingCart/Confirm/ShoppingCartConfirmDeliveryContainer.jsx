import { connect } from 'react-redux';
import ShoppingCartOrderDeliverySummaryComponent from 'components/ShoppingCart/Order/ShoppingCartOrderDeliverySummaryComponent';

const mapStateToProps = (state) => {
    const paymentDelivery = state.payment.current.delivery;

    return {
        name: paymentDelivery.name,
        address: paymentDelivery.address,
        postalCode: paymentDelivery.postalCode,
        city: paymentDelivery.city,
        country: paymentDelivery.country.name,
        phone: paymentDelivery.phone,
    };
};

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartOrderDeliverySummaryComponent);
