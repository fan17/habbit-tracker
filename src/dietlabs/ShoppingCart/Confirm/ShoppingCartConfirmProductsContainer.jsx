import { connect } from 'react-redux';
import ShoppingCartOrderProductsSummaryComponent from 'components/ShoppingCart/Order/ShoppingCartOrderProductsSummaryComponent';

const mapStateToProps = (state) => {
    const payment = state.payment.current;

    return {
        products: payment.products,
        productsPrice: payment.productsPrice,
        deliveryOptionPrice: payment.deliveryOptionPrice,
        totalPrice: payment.totalPrice,
    };
};

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartOrderProductsSummaryComponent);
