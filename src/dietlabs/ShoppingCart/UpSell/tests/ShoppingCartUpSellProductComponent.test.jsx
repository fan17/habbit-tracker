import React from 'react';
import { shallow } from 'enzyme';
import { Button, Row } from 'reactstrap';
import ShoppingCartProduct from 'view/ShoppingCart/Product/ShoppingCartProduct';
import Price from 'view/Price/Price';
import SaleProduct from 'view/Sale/Product/SaleProduct';
import { Redirect } from 'react-router';
import { ShoppingCartUpSellProductComponent } from '../ShoppingCartUpSellProductComponent';

describe('ShoppingCartUpSellComponent', () => {
    let renderedComponent;

    describe('products', () => {
        it('should display few', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const products = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="product"]').exists() === true
            ));

            expect(products).toHaveLength(3);
        });

        it('each product should have name', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const products = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="product-name"]').exists() === true
            ));

            expect(products).toHaveLength(3);
        });

        it('each product should have price', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const products = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="product-price"]').exists() === true
            ));

            expect(products).toHaveLength(3);
        });

        it('each product should have `add product button`', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const products = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="add-product-button"]').exists() === true
            ));

            expect(products).toHaveLength(3);
        });

        it('each product should have `about product button`', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const products = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="about-product-button"]').exists() === true
            ));

            expect(products).toHaveLength(3);
        });
    });

    describe('add', () => {
        it('should call add when click the add button', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const button = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="add-product-button"]').exists() === true
            )).first();

            button.simulate('click', { preventDefault() {} });

            expect(parameters.add).toHaveBeenCalledTimes(1);
            expect(parameters.add).toHaveBeenCalledWith(88);
        });
    });

    describe('productIsInCart', () => {
        it('should display add-product-button, when product is not in cart', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                ],
                productIsInCart: jest.fn(() => false),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const addProductButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="add-product-button"]').exists() === true
            ));

            const productAddedButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="product-added"]').exists() === true
            ));

            expect(addProductButton).toHaveLength(1);
            expect(productAddedButton).toHaveLength(0);
        });

        it('should display product-added, when product is not in cart', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(() => true),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const addProductButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="add-product-button"]').exists() === true
            ));

            const productAddedButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="product-added"]').exists() === true
            ));

            expect(addProductButton).toHaveLength(0);
            expect(productAddedButton).toHaveLength(1);
        });
    });

    describe('redirect to /cart', () => {
        it('should redirect if token is NOT set', () => {
            const parameters = {
                t: jest.fn(),
                token: null,
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/cart');
        });

        it('should redirect if cartProducts is empty', () => {
            const parameters = {
                t: jest.fn(),
                token: 'example',
                cartProducts: [],
                upSellProducts: [
                    new ShoppingCartProduct(new SaleProduct(88, 'example', new Price(10.5, 'PLN'), false, false, false), 2),
                    new ShoppingCartProduct(new SaleProduct(2, 'example', new Price(100, 'PLN'), false, false, false), 7),
                    new ShoppingCartProduct(new SaleProduct(3, 'example', new Price(15, 'PLN'), false, false, false), 1),
                ],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/cart');
        });

        it('should redirect if upSellProducts is empty', () => {
            const parameters = {
                t: jest.fn(),
                token: null,
                cartProducts: [
                    new ShoppingCartProduct(new SaleProduct(1, 'example', new Price(5, 'PLN'), false, false, false), 1),
                ],
                upSellProducts: [],
                productIsInCart: jest.fn(),
                add: jest.fn(),
            };
            renderedComponent = shallow(<ShoppingCartUpSellProductComponent {...parameters} />);

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/cart');
        });
    });
});
