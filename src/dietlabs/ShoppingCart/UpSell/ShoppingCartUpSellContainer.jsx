import { connect } from 'react-redux';
import ShoppingCartUpSellComponent from 'components/ShoppingCart/UpSell/ShoppingCartUpSellComponent';
import { shoppingCartIndexSaveAction } from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveAction';

const mapStateToProps = state => ({
    token: state.shoppingCart.token,
    userSawUpSelling: state.shoppingCart.userSawUpSelling,
});

const mapDispatchToProps = dispatch => ({
    saveCart: () => dispatch(shoppingCartIndexSaveAction(true)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartUpSellComponent);
