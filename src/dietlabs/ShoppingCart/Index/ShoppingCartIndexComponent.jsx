import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { Button, Container } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import { PATHS } from 'config/paths';
import scrollToElement from 'components/Helpers/scrollToElement';
import ShoppingCartIndexProductContainer from 'view/ShoppingCart/Index/Product/ShoppingCartIndexProductContainer';
import ShoppingCartIndexDeliveryOptionContainer from 'view/ShoppingCart/Index/DeliveryOption/ShoppingCartIndexDeliveryOptionContainer';
import ShoppingCartIndexSummaryContainer from 'view/ShoppingCart/Index/Summary/ShoppingCartIndexSummaryContainer';
import { SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE } from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType';
import ShoppingCartIndexPlaceholder from './ShoppingCartIndexPlaceholder';

export class ShoppingCartIndexComponent extends React.Component {
    constructor(props) {
        super(props);

        this.scrollAnchorRef = React.createRef();

        this.state = {
            initialized: false,
            shouldRedirectToUpSell: false,
            shouldRedirectToConfirm: false,
        };
    }

    componentDidMount() {
        this.props.load().then(() => this.setState({ initialized: true }));
    }

    async saveCart() {
        const result = await this.props.saveCart();
        try {
            if (result.type === SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE) {
                if (result.upSellProducts.length) {
                    this.setState({ shouldRedirectToUpSell: true });
                } else {
                    this.setState({ shouldRedirectToConfirm: true });
                }
            }
            else {
                scrollToElement(this.scrollAnchorRef.current);
            }
        } catch (exception) {
            // nothing to do here
        }
    }

    render() {
        let result = this.constructor.renderPlaceholder();
        if (this.state.initialized) {
            if (!this.props.areThereSomeProductsInCart) {
                result = <Redirect to={PATHS.HOME} />;
            } else if (this.state.shouldRedirectToUpSell) {
                result = <Redirect to={PATHS.CART.UPSELL} />;
            } else if (this.state.shouldRedirectToConfirm) {
                const pathToCartConfirm = PATHS.CART.CONFIRM.split(':')[0] + this.props.token;
                result = <Redirect to={pathToCartConfirm} />;
            } else {
                result = this.renderInitializedComponent();
            }
        }
        return result;
    }

    renderInitializedComponent() {
        return (
            <div className="page-template-cart">
                <header>
                    <h1 className="text-center d-none d-md-block">
                        {this.props.t('cart/title')}
                    </h1>
                </header>
                <ShoppingCartIndexProductContainer />
                <div ref={this.scrollAnchorRef}>
                    <ShoppingCartIndexDeliveryOptionContainer />
                </div>
                <ShoppingCartIndexSummaryContainer />
                <section className="text-center">
                    <Container>
                        <Button
                            data-test="save-cart-button"
                            onClick={() => this.saveCart()}
                            color="blue"
                        >
                            {this.props.t('cart/pay')}
                        </Button>
                    </Container>
                </section>
            </div>
        );
    }

    static renderPlaceholder() {
        return (
            <ShoppingCartIndexPlaceholder data-test="shopping-cart-index-placeholder" />
        );
    }
}

ShoppingCartIndexComponent.propTypes = {
    t: PropTypes.func.isRequired,
    areThereSomeProductsInCart: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    saveCart: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default withRouter(withLocale(ShoppingCartIndexComponent));
