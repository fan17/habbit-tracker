import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { withLocale } from 'TranslatorContext'
import { PATHS } from 'config/paths'
import ShoppingCartConfirmProductsContainer from 'view/ShoppingCart/Confirm/ShoppingCartConfirmProductsContainer'
import ShoppingCartConfirmIsDeliveryChosenContainer from 'view/ShoppingCart/Confirm/ShoppingCartConfirmIsDeliveryChosenContainer'
import ShoppingCartConfirmPaymentContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentContainer'

export class ShoppingCartConfirmComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initialized: false,
            paymentExists: null,
        }
    }

    componentDidMount() {
        this.props.loadPayment(this.props.match.params.token)
            .then(payment => (
                this.setState({
                    initialized: true,
                    paymentExists: payment.exists,
                })
            ))
        // TODO
        // if paymentData != cart - warning to rollbar
        // and change cart
    }

    render() {
        let result = ''
        if (this.state.initialized) {
            if (this.state.paymentExists === false) {
                result = <Redirect to={PATHS.HOME} />
            } else {
                result = this.renderView()
            }
        } else {
            result = this.constructor.renderPlaceholder()
        }

        return result
    }

    renderView() {
        return (
            <section>
                <ShoppingCartConfirmProductsContainer />
                <ShoppingCartConfirmIsDeliveryChosenContainer />
                <ShoppingCartConfirmPaymentContainer token={this.props.match.params.token} />
                <Container>
                    <Link to={PATHS.CART.INDEX}>Back to cart</Link>
                </Container>
            </section>
        )
    }

    static renderPlaceholder() {
        return (
            <div data-test="shopping-cart-confirm-placeholder">placeholder</div>
        )
    }
}

ShoppingCartConfirmComponent.propTypes = {
    t: PropTypes.func.isRequired,
    loadPayment: PropTypes.func.isRequired,
}

export default withRouter(withLocale(ShoppingCartConfirmComponent))
