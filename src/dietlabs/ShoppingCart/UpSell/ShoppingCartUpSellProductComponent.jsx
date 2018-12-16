import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import { PATHS } from 'config/paths';
import { withLocale } from 'TranslatorContext';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';

export class ShoppingCartUpSellProductComponent extends React.Component {
    static aboutProduct() {
        // TODO
    }

    render() {
        if (
            !this.props.token
            || this.props.cartProducts.length === 0
            || this.props.upSellProducts.length === 0
        ) {
            return <Redirect to={PATHS.CART.INDEX} />;
        }
        return (
            <React.Fragment>
                {this.props.upSellProducts.map(product => (
                    <Row
                        key={product.id}
                        data-test="product"
                        style={{ border: '1px solid blue' }}
                    >
                        <Col>
                            <div data-test="product-name">
                                {`name:${product.name}`}
                            </div>
                            <div data-test="product-price">
                                {`price:${product.sumPrice}`}
                            </div>
                        </Col>
                        <Col>
                            {this.props.productIsInCart(product.id, this.props.cartProducts)
                                ? (
                                    <Button data-test="product-added">
                                        Addedd
                                    </Button>
                                ) : (
                                    <Button
                                        data-test="add-product-button"
                                        onClick={() => this.props.add(product.id)}
                                    >
                                        Add product
                                    </Button>
                                )
                            }
                            <Button
                                data-test="about-product-button"
                                onClick={() => this.constructor.aboutProduct(product)}
                            >
                                About
                            </Button>
                        </Col>
                    </Row>
                ))}
            </React.Fragment>
        );
    }
}

ShoppingCartUpSellProductComponent.propTypes = {
    t: PropTypes.func.isRequired,
    upSellProducts: PropTypes.arrayOf(PropTypes.instanceOf(ShoppingCartProduct)).isRequired,
    cartProducts: PropTypes.arrayOf(PropTypes.instanceOf(ShoppingCartProduct)).isRequired,
    token: PropTypes.string,
    add: PropTypes.func.isRequired,
    productIsInCart: PropTypes.func.isRequired,
};

export default withLocale(ShoppingCartUpSellProductComponent);
