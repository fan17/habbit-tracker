import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import Price from 'view/Price/Price';

export class ShoppingCartIndexSummaryComponent extends React.Component {
    render() {
        return (
            <section className="cart-summary">
                <Container>
                    <h2>{this.props.t('cart/summary')}</h2>
                    <Row data-test="products-price">
                        <Col>{this.props.t('cart/summary/products')}</Col>
                        <Col className="price">
                            {this.props.productsPrice.toString()}
                        </Col>
                    </Row>
                    <Row data-test="delivery-option-price" className="delivery-option-price">
                        <Col>{this.props.t('cart/summary/delivery')}</Col>
                        <Col className="price">
                            {this.props.deliveryOptionPrice.toString()}
                        </Col>
                    </Row>
                    <Row data-test="total-price">
                        <Col><strong>{this.props.t('cart/summary/total')}</strong></Col>
                        <Col className="price">
                            <strong>{this.props.totalPrice.toString()}</strong>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

ShoppingCartIndexSummaryComponent.propTypes = {
    t: PropTypes.func.isRequired,
    productsPrice: PropTypes.instanceOf(Price).isRequired,
    deliveryOptionPrice: PropTypes.instanceOf(Price).isRequired,
    totalPrice: PropTypes.instanceOf(Price).isRequired,
};

export default withLocale(ShoppingCartIndexSummaryComponent);
