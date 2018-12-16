import React from 'react';
import { shallow } from 'enzyme';
import { Row, Button } from 'reactstrap';
import Price from 'view/Price/Price';
import ValidationError from 'view/Validation/ValidationError';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';
import SaleProduct from 'view/Sale/Product/SaleProduct';
import { ShoppingCartIndexProductComponent } from '../ShoppingCartIndexProductComponent';

describe('<ShoppingCartIndexProductComponent />', () => {
    let renderedComponent;

    it('should display products in cart', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const productRows = renderedComponent.findWhere(element => (
            element.type() === Row
            && element.find('[data-test="product-row"]').exists() === true
        ));
        expect(productRows).toHaveLength(parameters.products.length);
    });

    it('should display increase button only for physical products', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), true, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const buttons = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-increase"]').exists() === true
        ));

        expect(buttons).toHaveLength(1);
    });

    it('should display decrease button only for physical products', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), true, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const buttons = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-decrease"]').exists() === true
        ));

        expect(buttons).toHaveLength(1);
    });

    it('should always display remove button for each product', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), true, false, false), 2),
                new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const buttons = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-remove"]').exists() === true
        ));

        expect(buttons).toHaveLength(2);
    });

    it('should call `props.increase` when click button', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), true, false, false), 2),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const button = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-increase"]').exists() === true
        )).first();

        button.simulate('click', { preventDefault() {} });

        expect(parameters.increase).toHaveBeenCalledTimes(1);
        expect(parameters.increase).toHaveBeenCalledWith(88);
    });

    it('should call `props.decrease` when click button', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), true, false, false), 2),
            ],
        };
        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const button = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-decrease"]').exists() === true
        )).first();

        button.simulate('click', { preventDefault() {} });

        expect(parameters.decrease).toHaveBeenCalledTimes(1);
        expect(parameters.decrease).toHaveBeenCalledWith(88);
    });

    it('should call `props.remove` when click button', () => {
        const parameters = {
            t: jest.fn(),
            increase: jest.fn(),
            decrease: jest.fn(),
            remove: jest.fn(),
            validationError: new ValidationError(),
            products: [
                new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
            ],
        };

        renderedComponent = shallow(<ShoppingCartIndexProductComponent {...parameters} />);

        const button = renderedComponent.findWhere(element => (
            element.type() === Button
            && element.find('[data-test="button-remove"]').exists() === true
        )).first();

        button.simulate('click', { preventDefault() {} });

        expect(parameters.remove).toHaveBeenCalledTimes(1);
        expect(parameters.remove).toHaveBeenCalledWith(88);
    });
});
