import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import { PATHS } from 'config/paths';

export class ShoppingCartThankYouComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
            paymentExists: null,
            payment: null,
        };
    }

    componentDidMount() {
        this.props.loadPayment(this.props.match.params.token).then(payment => this.setState({
            initialized: true,
            paymentExists: payment.exists,
            payment,
        }));
    }

    render() {
        let result = '';
        if (this.state.initialized) {
            if (this.state.paymentExists === false) {
                result = <Redirect to={PATHS.HOME} />;
            } else {
                result = this.renderView();
            }
        } else {
            result = this.constructor.renderPlaceholder();
        }

        return result;
    }

    renderView() {
        return (
            <section>
                {this.state.payment.token}
                <Container>
                    <Link to={PATHS.CART.INDEX}>Back to cart</Link>
                </Container>
            </section>
        );
    }

    static renderPlaceholder() {
        return <div data-test="placeholder">placeholder</div>;
    }
}

ShoppingCartThankYouComponent.propTypes = {
    t: PropTypes.func.isRequired,
    loadPayment: PropTypes.func.isRequired,
};

export default withRouter(withLocale(ShoppingCartThankYouComponent));
