import React from 'react';
import { shallow } from 'enzyme';
import { Row, Button } from 'reactstrap';
import { Redirect } from 'react-router';
import ShoppingCartPaymentMethodOption from 'view/ShoppingCart/Payment/Method/Option/ShoppingCartPaymentMethodOption';
import ShoppingCartPaymentMethod from 'view/ShoppingCart/Payment/Method/ShoppingCartPaymentMethod';
import {
    SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR,
    SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
    SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION,
} from 'view/ShoppingCart/Confirm/Payment/Make/ShoppingCartPaymentMakeActionType';
import { ShoppingCartConfirmPaymentOnlineComponent } from '../ShoppingCartConfirmPaymentOnlineComponent';

describe('ShoppingCartConfirmPaymentOnlineComponent', () => {
    let renderedComponent = null;

    describe('initialized', () => {
        it('should be false on start', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);

            expect(renderedComponent.state().initialized).toBeFalsy();
        });

        it('should return placeholder when `initialized` is NOT set', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: false });

            const placeholder = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="shopping-cart-confirm-payment-online-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeTruthy();
        });

        it('should NOT return placeholder when `initialized` is set', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const placeholder = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="shopping-cart-confirm-payment-online-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeFalsy();
        });
    });

    describe('load', () => {
        it('should be called on start', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);

            expect(parameters.load).toHaveBeenCalledTimes(1);
        });

        it('should set initailized', async () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = await shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);

            expect(renderedComponent.state().initialized).toBeTruthy();
        });
    });

    describe('methods', () => {
        it('should not be visible if methods are empty array', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodSections = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="payment-method-row"]').exists() === true
            ));

            expect(methodSections).toHaveLength(0);
        });

        it('should display 1 method', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title'),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodSections = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="payment-method-row"]').exists() === true
            ));

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-pay"]').exists() === true
            ));

            const methodExpandButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-expand"]').exists() === true
            ));

            expect(methodSections).toHaveLength(1);
            expect(methodSections.first().contains('example-method-title')).toBeTruthy();
            expect(methodPayButton).toHaveLength(1);
            expect(methodExpandButton).toHaveLength(0);
        });

        it('should display few methods', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title'),
                    new ShoppingCartPaymentMethod('example1-method-title'),
                    new ShoppingCartPaymentMethod('example2-method-title'),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodSections = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="payment-method-row"]').exists() === true
            ));

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-pay"]').exists() === true
            ));

            const methodExpandButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-expand"]').exists() === true
            ));

            expect(methodSections).toHaveLength(3);
            expect(methodPayButton).toHaveLength(3);
            expect(methodExpandButton).toHaveLength(0);
        });

        it('should display 1 method option', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title', [
                        new ShoppingCartPaymentMethodOption(10, 'channel'),
                    ]),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodSections = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="payment-method-row"]').exists() === true
            ));

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-pay"]').exists() === true
            ));

            const methodExpandButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-expand"]').exists() === true
            ));

            const methodOptionPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-option-button-pay"]').exists() === true
            ));

            expect(methodSections).toHaveLength(1);
            expect(methodPayButton).toHaveLength(0);
            expect(methodExpandButton).toHaveLength(1);
            expect(methodOptionPayButton).toHaveLength(1);
        });

        it('should display few method options', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title', [
                        new ShoppingCartPaymentMethodOption(10, 'channel'),
                        new ShoppingCartPaymentMethodOption(11, 'channel1'),
                    ]),
                    new ShoppingCartPaymentMethod(200, undefined, 'example2-method-title', [
                        new ShoppingCartPaymentMethodOption(20, 'channel2'),
                    ]),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodSections = renderedComponent.findWhere(element => (
                element.type() === Row
                && element.find('[data-test="payment-method-row"]').exists() === true
            ));

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-pay"]').exists() === true
            ));

            const methodExpandButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-expand"]').exists() === true
            ));

            const methodOptionPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-option-button-pay"]').exists() === true
            ));

            expect(methodSections).toHaveLength(2);
            expect(methodPayButton).toHaveLength(0);
            expect(methodExpandButton).toHaveLength(2);
            expect(methodOptionPayButton).toHaveLength(3);
        });
    });

    describe('make', () => {
        it('should be called if method has been choosen', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ type: SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title'),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-button-pay"]').exists() === true
            )).first();
            methodPayButton.simulate('click');

            expect(parameters.make).toHaveBeenCalledTimes(1);
            expect(parameters.make).toHaveBeenCalledWith(parameters.token, 100, undefined);
        });

        it('should be called if method-option has been choosen', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({ type: SHOPPING_CART_PAYMENT_MAKE_VALIDATION_EXCEPTION })),
                t: jest.fn(),
                methods: [
                    new ShoppingCartPaymentMethod(100, undefined, 'example-method-title', [
                        new ShoppingCartPaymentMethodOption(101, 'channel'),
                        new ShoppingCartPaymentMethodOption(102, 'channel1'),
                    ]),
                ],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const methodPayButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="payment-method-option-button-pay"]').exists() === true
            )).first();
            methodPayButton.simulate('click');

            expect(parameters.make).toHaveBeenCalledTimes(1);
            expect(parameters.make).toHaveBeenCalledWith(parameters.token, 100, 101);
        });

        it.skip('should redirect to external site if response.type === SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR', async () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_REDIRECT_TO_OPERATOR,
                    url: 'https://www.google.com',
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            await renderedComponent.instance().choosePaymentMethod({
                methodId: 100,
                channelId: undefined,
            });

            expect(global.location.href).toEqual('https://www.google.com');
        });

        it('should redirect to ThankYou page if response.type === SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE and isCod is set', async () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                    isCod: true,
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            await renderedComponent.instance().choosePaymentMethod({
                methodId: 100,
                channelId: undefined,
            });

            expect(renderedComponent.state().redirectTo).toEqual('/cart/thank-you/example-token');
        });

        it('should redirect to ThankYou page if response.type === SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE and isBankTransfer is set', async () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                    isBankTransfer: true,
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            await renderedComponent.instance().choosePaymentMethod({
                methodId: 100,
                channelId: undefined,
            });

            expect(renderedComponent.state().redirectTo).toEqual('/cart/bank-transfer/example-token');
        });
    });

    describe('redirectTo', () => {
        it('should be null on start', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                    isBankTransfer: true,
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);

            expect(renderedComponent.state().redirectTo).toEqual(null);
        });

        it('should redirect', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                    isBankTransfer: true,
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                redirectTo: '/',
            });

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/');
        });

        it('should NOT redirect', () => {
            const parameters = {
                token: 'example-token',
                make: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_PAYMENT_MAKE_CONTINUE_ON_SITE,
                    isBankTransfer: true,
                })),
                t: jest.fn(),
                methods: [],
                load: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmPaymentOnlineComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                redirectTo: null,
            });

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeFalsy();
        });
    });
});
