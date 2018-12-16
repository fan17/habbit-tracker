import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import Price from 'view/Price/Price';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';

export class ShoppingCartOrderProductsSummaryComponent extends React.Component {
    render() {
        return (
            <Container>
                <h2>Summary</h2>
                {this.props.products.map(product => (
                    <Row key={product.id} data-test="product-row">
                        <div>
                            {`name:${product.name} amount: ${product.amount}  sumPrice:${product.sumPrice}`}
                        </div>
                    </Row>
                ))}
                <Row data-test="products-price">
                    {`Products:${this.props.productsPrice.toString()}`}
                </Row>
                <Row data-test="delivery-option-price">
                    {`Delivery:${this.props.deliveryOptionPrice.toString()}`}
                </Row>
                <Row data-test="total-price">
                    {`Total:${this.props.totalPrice.toString()}`}
                </Row>
            </Container>
        );
    }
}

ShoppingCartOrderProductsSummaryComponent.propTypes = {
    t: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.instanceOf(ShoppingCartProduct)).isRequired,
    productsPrice: PropTypes.instanceOf(Price).isRequired,
    deliveryOptionPrice: PropTypes.instanceOf(Price).isRequired,
    totalPrice: PropTypes.instanceOf(Price).isRequired,
};

export default withLocale(ShoppingCartOrderProductsSummaryComponent);
