import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import { Link } from 'react-router-dom';
import { PATHS } from 'config/paths';

export class ShoppingCartOrderDeliverySummaryComponent extends React.Component {
    render() {
        return (
            <Container>
                <h2>address of delivery</h2>
                <Row>
                    name:
                    <span data-test="name">
                        {this.props.name}
                    </span>
                </Row>
                <Row>
                    address:
                    <span data-test="address">
                        {this.props.address}
                    </span>
                </Row>
                <Row>
                    postalCode:
                    <span data-test="postalCode">
                        {this.props.postalCode}
                    </span>
                </Row>
                <Row>
                    city:
                    <span data-test="city">
                        {this.props.city}
                    </span>
                </Row>
                <Row>
                    country:
                    <span data-test="country">
                        {this.props.country}
                    </span>
                </Row>
                <Row>
                    phone:
                    <span data-test="phone">
                        {this.props.phone}
                    </span>
                </Row>
                <Link
                    data-test="change"
                    to={PATHS.CART.INDEX}
                >
                    change
                </Link>
            </Container>
        );
    }
}

ShoppingCartOrderDeliverySummaryComponent.propTypes = {
    t: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

export default withLocale(ShoppingCartOrderDeliverySummaryComponent);
