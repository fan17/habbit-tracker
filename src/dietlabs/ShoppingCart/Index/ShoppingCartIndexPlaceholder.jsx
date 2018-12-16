import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Container, Row, Col, FormGroup, Label,
} from 'reactstrap';
import { withLocale } from 'TranslatorContext';

export class ShoppingCartIndexPlaceholder extends React.Component {
    render() {
        return (
            <div className="page-template-cart">
                <header>
                    <h1 className="text-center d-none d-md-block">
                        {this.props.t('cart/title')}
                    </h1>
                </header>
                <section className="cart-product">
                    <Container>
                        <Row>
                            <Col>
                                <span className="placeholder">Product name</span>
                            </Col>
                            <Col className="text-center">
                                <Button
                                    className="button-remove"
                                >
                                    ×
                                </Button>
                            </Col>
                            <Col className="price">
                                0 PLN
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="payment-method">
                    <Container>
                        <h2>{this.props.t('cart/payment-method')}</h2>

                        <FormGroup tag="fieldset">
                            <div className="form-check">
                                <Label className="form-check-label">
                                    <div className="checkmark radio placeholder" />
                                    {this.props.t('cart/placeholder/payment-method-1')}
                                </Label>
                            </div>

                            <div className="form-check">
                                <Label className="form-check-label">
                                    <div className="checkmark radio placeholder" />
                                    {this.props.t('cart/placeholder/payment-method-2')}
                                </Label>
                            </div>
                        </FormGroup>

                    </Container>
                </section>

                <section className="cart-summary">
                    <Container>
                        <h2>{this.props.t('cart/summary')}</h2>
                        <Row>
                            <Col>{this.props.t('cart/summary/products')}</Col>
                            <Col className="price">
                                0 PLN
                            </Col>
                        </Row>
                        <Row className="delivery-option-price">
                            <Col>{this.props.t('cart/summary/delivery')}</Col>
                            <Col className="price">
                                0 PLN
                            </Col>
                        </Row>
                        <Row>
                            <Col><strong>{this.props.t('cart/summary/total')}</strong></Col>
                            <Col className="price">
                                <strong>0 PLN</strong>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="text-center">
                    <Container>
                        <Button
                            color="placeholder"
                        >
                            {this.props.t('cart/pay')}
                        </Button>
                    </Container>
                </section>
            </div>
        );
    }
}

ShoppingCartIndexPlaceholder.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withLocale(ShoppingCartIndexPlaceholder);
