import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Button, Container, Row } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import ShoppingCartPaymentMethod from 'view/ShoppingCart/Payment/Method/ShoppingCartPaymentMethod';
import {
    SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR,
    SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
    SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION,
} from 'view/ShoppingCart/Confirm/Payment/Make/ShoppingCartPaymentMakeActionType';
import { PATHS } from 'config/paths';

export class ShoppingCartConfirmPaymentOnlineComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
            redirectTo: null,
        };
    }

    componentDidMount() {
        this.props.load().then(() => this.setState({ initialized: true }));
    }

    render() {
        let result = '';
        if (this.state.initialized) {
            if (this.state.redirectTo) {
                result = <Redirect to={this.state.redirectTo} />;
            } else {
                result = this.renderInitializedComponent();
            }
        } else {
            result = this.constructor.renderPlaceholder();
        }

        return result;
    }

    resolve(response) {
        if (response.type === SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR) {
            global.location.href = response.url;
        } else if (response.type === SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE) {
            let redirectTo;
            if (response.isCod) {
                redirectTo = PATHS.CART.THANK_YOU.replace(':token', this.props.token);
            } else if (response.isBankTransfer) {
                redirectTo = PATHS.CART.BANK_TRANSFER.replace(':token', this.props.token);
            }

            if (redirectTo) {
                this.setState({ redirectTo });
            }
        } else if (response.type === SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION) {
            // TODO: response.error

        } else {
            throw Error;
        }
    }

    choosePaymentMethod(paymentMethod) {
        this.props
            .make(
                this.props.token,
                paymentMethod.methodId,
                paymentMethod.channelId
            )
            .then(response => this.resolve(response));
    }

    choosePaymentMethodOption(paymentMethod, paymentMethodOptions) {
        this.props
            .make(
                this.props.token,
                paymentMethod.methodId,
                paymentMethodOptions.id
            )
            .then(response => this.resolve(response));
    }

    renderInitializedComponent() {
        return (
            <Container>
                {this.props.methods.map(method => (
                    <Row
                        key={`${method.methodId}_${method.channelId}`}
                        data-test="payment-method-row"
                    >
                        name:
                        {method.name}
                        {!method.hasOptions ? (
                            <Button
                                data-test="payment-method-button-pay"
                                onClick={() => this.choosePaymentMethod(method)}
                            >
                                Pay
                            </Button>
                        ) : (
                            <Button data-test="payment-method-button-expand">
                                Expand
                            </Button>
                        )}
                        {method.hasOptions
                            ? method.options.map(option => (
                                <Button
                                    key={`${method.methodId}_${option.id}`}
                                    data-test="payment-method-option-button-pay"
                                    onClick={() => this.choosePaymentMethodOption(
                                        method,
                                        option
                                    )
                                    }
                                >
                                      option:
                                    {option.name}
                                </Button>
                            ))
                            : ''}
                    </Row>
                ))}
            </Container>
        );
    }

    static renderPlaceholder() {
        return (
            <div data-test="shopping-cart-confirm-payment-online-placeholder">
                placeholder
            </div>
        );
    }
}

ShoppingCartConfirmPaymentOnlineComponent.propTypes = {
    t: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    methods: PropTypes.arrayOf(
        PropTypes.instanceOf(ShoppingCartPaymentMethod).isRequired
    ).isRequired,
    token: PropTypes.string.isRequired,
    make: PropTypes.func.isRequired,
};

export default withLocale(ShoppingCartConfirmPaymentOnlineComponent);
