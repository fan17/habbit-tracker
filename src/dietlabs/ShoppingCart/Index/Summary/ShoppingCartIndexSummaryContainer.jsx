import { connect } from 'react-redux';
import ShoppingCartIndexSummaryComponent from 'components/ShoppingCart/Index/ShoppingCartIndexSummaryComponent';
import ShoppingCartPriceFactory from 'view/ShoppingCart/Price/ShoppingCartPriceFactory';

const mapStateToProps = (state) => {
    const price = ShoppingCartPriceFactory.createFromState(state);

    return {
        productsPrice: price.products,
        deliveryOptionPrice: price.deliveryOption,
        totalPrice: price.total,
    };
};

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartIndexSummaryComponent);
