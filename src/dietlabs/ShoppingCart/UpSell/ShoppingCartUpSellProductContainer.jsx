import { connect } from 'react-redux';
import ShoppingCartUpSellProductComponent from 'components/ShoppingCart/UpSell/ShoppingCartUpSellProductComponent';
import { shoppingCartProductAddAction } from 'view/ShoppingCart/Product/Add/ShoppingCartProductAddAction';
import { shoppingCartProductIsInCartAction } from 'view/ShoppingCart/Product/IsInCart/ShoppingCartProductIsInCart';
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory';
import ShoppingCartUpSellFactory from './ShoppingCartUpSellFactory';

const mapStateToProps = state => ({
    userSawUpSelling: state.shoppingCart.userSawUpSelling,
    upSellProducts: ShoppingCartUpSellFactory.createFromState(state).products,
    cartProducts: ShoppingCartProductsFactory.createFromState(state).products,
    token: state.shoppingCart.token,
});

const mapDispatchToProps = dispatch => ({
    add: productId => dispatch(shoppingCartProductAddAction(productId, 1, false)),
    productIsInCart: (productId, cartProducts) => shoppingCartProductIsInCartAction(productId, cartProducts),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartUpSellProductComponent);
