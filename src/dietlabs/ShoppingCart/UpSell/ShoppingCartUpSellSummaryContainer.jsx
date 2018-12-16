import { connect } from 'react-redux';
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory';
import ShoppingCartOrderProductsSummaryComponent from 'components/ShoppingCart/Order/ShoppingCartOrderProductsSummaryComponent';
import ShoppingCartPriceFactory from 'view/ShoppingCart/Price/ShoppingCartPriceFactory';

const mapStateToProps = (state) => {
    const price = ShoppingCartPriceFactory.createFromState(state);

    return {
        products: ShoppingCartProductsFactory.createFromState(state).products,
        productsPrice: price.products,
        deliveryOptionPrice: price.deliveryOption,
        totalPrice: price.total,
    };
};

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartOrderProductsSummaryComponent);
