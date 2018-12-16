import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import { PATHS } from 'config/paths';
import ShoppingCartUpSellProductContainer from 'view/ShoppingCart/UpSell/ShoppingCartUpSellProductContainer';
import ShoppingCartUpSellSummaryContainer from 'view/ShoppingCart/UpSell/ShoppingCartUpSellSummaryContainer';
import {
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
} from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType';

export class ShoppingCartUpSellComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirectToFirstStep: false,
            shouldRedirectToConfirm: false,
        };
    }

    async saveCart() {
        const result = await this.props.saveCart();

        switch (result.type) {
        case SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE:
            this.setState({ shouldRedirectToConfirm: true });
            break;
        case SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION:
            this.setState({ shouldRedirectToFirstStep: true });
            break;
        }
    }

    render() {
        let result = '';

        if (this.state.shouldRedirectToFirstStep) {
            result = <Redirect to={PATHS.CART.INDEX} />;
        } else if (
            this.state.shouldRedirectToConfirm
            || this.props.userSawUpSelling
        ) {
            const pathToCartConfirm = PATHS.CART.CONFIRM.split(':')[0] + this.props.token;
            result = <Redirect to={pathToCartConfirm} />;
        } else {
            result = this.renderView();
        }

        return result;
    }

    renderView() {
        return (
            <section>
                <ShoppingCartUpSellProductContainer />
                <ShoppingCartUpSellSummaryContainer />
                <Button
                    data-test="save-cart-button"
                    onClick={() => this.saveCart()}
                >
                    Pay
                </Button>
                <Link
                    to={PATHS.HOME}
                    data-test="back-to-shop-link"
                >
                    Back to shop
                </Link>
            </section>
        );
    }
}

ShoppingCartUpSellComponent.propTypes = {
    t: PropTypes.func.isRequired,
    saveCart: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    userSawUpSelling: PropTypes.bool.isRequired,
};

export default withLocale(ShoppingCartUpSellComponent);
