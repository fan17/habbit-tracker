import { connect } from 'react-redux';
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory';
import ShoppingCartIndexComponent from 'components/ShoppingCart/Index/ShoppingCartIndexComponent';
import { shoppingCartIndexLoadAction } from 'view/ShoppingCart/Index/Load/ShoppingCartIndexLoadAction';
import { shoppingCartIndexSaveAction } from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveAction';
import ShoppingCartIndexSaveOrderFactory from 'view/ShoppingCart/Index/Save/Order/ShoppingCartIndexSaveOrderFactory';

const mapStateToProps = (state) => {
    const areThereSomeProductsInCart = ShoppingCartProductsFactory.createFromState(state).areThereSomeProducts;
    const order = ShoppingCartIndexSaveOrderFactory.createFromState(state);

    return {
        order,
        areThereSomeProductsInCart,
        token: state.shoppingCart.token,
    };
};

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(shoppingCartIndexLoadAction()),
    saveCart: () => dispatch(shoppingCartIndexSaveAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartIndexComponent);
