import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'reactstrap';
import Price from 'view/Price/Price';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';
import SaleProduct from 'view/Sale/Product/SaleProduct';
import { ShoppingCartOrderProductsSummaryComponent } from '../ShoppingCartOrderProductsSummaryComponent';

describe('<ShoppingCartOrderProductsSummaryComponent />', () => {
    let renderedComponent;
    beforeAll(() => {
        const parameters = {
            t: jest.fn(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
            ],
            productsPrice: new Price(10, 'PLN'),
            deliveryOptionPrice: new Price(10, 'PLN'),
            totalPrice: new Price(10, 'PLN'),
        };
        renderedComponent = shallow(<ShoppingCartOrderProductsSummaryComponent {...parameters} />);
    });

    it('should display products price', () => {
        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="products-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });

    it('should display method price', () => {
        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="delivery-option-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });

    it('should display total price', () => {
        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="total-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });

    it('should display products', () => {
        const productRows = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="product-row"]').exists() === true
        ));

        expect(productRows).toHaveLength(3);
    });
});
