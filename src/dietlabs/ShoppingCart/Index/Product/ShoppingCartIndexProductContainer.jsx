import { connect } from 'react-redux';
import ValidationError from 'view/Validation/ValidationError';
import ShoppingCartProductsFactory from 'view/ShoppingCart/Product/ShoppingCartProductsFactory';
import { shoppingCartProductRemoveAction } from 'view/ShoppingCart/Product/Remove/ShoppingCartProductRemoveAction';
import ShoppingCartIndexProductComponent from 'components/ShoppingCart/Index/ShoppingCartIndexProductComponent';
import { shoppingCartProductAddAction } from '../../Product/Add/ShoppingCartProductAddAction';

const mapStateToProps = state => ({
    products: ShoppingCartProductsFactory.createFromState(state).products,
    validationError: ValidationError.createFromObject(state.shoppingCart.validationError),
});

const mapDispatchToProps = dispatch => ({
    increase: productId => dispatch(shoppingCartProductAddAction(productId, 1)),
    decrease: productId => dispatch(shoppingCartProductRemoveAction(productId, 1)),
    remove: productId => dispatch(shoppingCartProductRemoveAction(productId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartIndexProductComponent);
