import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'reactstrap';
import Price from 'view/Price/Price';
import { ShoppingCartIndexSummaryComponent } from '../ShoppingCartIndexSummaryComponent';

describe('<ShoppingCartIndexSummaryComponent />', () => {
    let renderedComponent;

    it('should display products price', () => {
        const parameters = {
            t: jest.fn(),
            productsPrice: new Price(10, 'PLN'),
            deliveryOptionPrice: new Price(10, 'PLN'),
            totalPrice: new Price(10, 'PLN'),
        };
        renderedComponent = shallow(<ShoppingCartIndexSummaryComponent {...parameters} />);

        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="products-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });

    it('should display method price', () => {
        const parameters = {
            t: jest.fn(),
            productsPrice: new Price(10, 'PLN'),
            deliveryOptionPrice: new Price(10, 'PLN'),
            totalPrice: new Price(10, 'PLN'),
        };
        renderedComponent = shallow(<ShoppingCartIndexSummaryComponent {...parameters} />);

        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="delivery-option-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });

    it('should display total price', () => {
        const parameters = {
            t: jest.fn(),
            productsPrice: new Price(10, 'PLN'),
            deliveryOptionPrice: new Price(10, 'PLN'),
            totalPrice: new Price(10, 'PLN'),
        };
        renderedComponent = shallow(<ShoppingCartIndexSummaryComponent {...parameters} />);

        const price = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="total-price"]').exists() === true
        )).first();

        expect(price.exists()).toBeTruthy();
    });
});
