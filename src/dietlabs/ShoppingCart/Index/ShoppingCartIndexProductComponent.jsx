import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Row, Col, Button,
} from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import ValidationError from 'view/Validation/ValidationError';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';

export class ShoppingCartIndexProductComponent extends React.Component {
    render() {
        return (
            <section className="cart-product">
                <Container>
                    {this.props.products.map(product => (
                        <Row key={product.id} data-test="product-row">

                            <Col>
                                {product.name}
                            </Col>
                            <Col className="text-center">
                                <Button
                                    className="button-remove"
                                    data-test="button-remove"
                                    onClick={() => this.props.remove(product.id)}
                                >
                                    ×
                                </Button>

                                {product.isItPossibleToBuyMoreThanOne
                                    ? (
                                        <div className="amount">
                                            <Button
                                                className="button-decrease"
                                                data-test="button-decrease"
                                                onClick={() => this.props.decrease(product.id)}
                                            >
                                            ⁃
                                            </Button>

                                            {product.amount}

                                            <Button
                                                className="button-increase"
                                                data-test="button-increase"
                                                onClick={() => this.props.increase(product.id)}
                                            >
                                            +
                                            </Button>
                                        </div>
                                    ) : ''
                                }
                            </Col>
                            <Col className="price">
                                {`${product.sumPrice}`}
                            </Col>
                        </Row>
                    ))}
                </Container>
            </section>
        );
    }
}

ShoppingCartIndexProductComponent.propTypes = {
    t: PropTypes.func.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.instanceOf(ShoppingCartProduct)).isRequired,
    validationError: PropTypes.instanceOf(ValidationError).isRequired,
};

export default withLocale(ShoppingCartIndexProductComponent);
