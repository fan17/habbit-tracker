import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ShoppingCartConfirmProductsContainer from 'view/ShoppingCart/Confirm/ShoppingCartConfirmProductsContainer';
import ShoppingCartConfirmIsDeliveryChosenContainer from 'view/ShoppingCart/Confirm/ShoppingCartConfirmIsDeliveryChosenContainer';
import ShoppingCartConfirmPaymentContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentContainer';
import { ShoppingCartConfirmComponent } from '../ShoppingCartConfirmComponent';

describe('<ShoppingCartConfirmComponent />', () => {
    let renderedComponent;

    describe('initialized', () => {
        it('should be false on start', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(renderedComponent.state().initialized).toBeFalsy();
        });

        it('should return placeholder when `initialized` is NOT set', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({ initialized: false });

            const placeholder = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="shopping-cart-confirm-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeTruthy();
        });

        it('should NOT return placeholder when `initialized` is set', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const placeholder = renderedComponent.findWhere(element => (
                element.type() === 'div'
                && element.find('[data-test="shopping-cart-confirm-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeFalsy();
        });
    });

    describe('paymentExists', () => {
        it('should be null on start', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(renderedComponent.state().paymentExists).toBeNull();
        });

        it('should redirect to / when is false', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: false,
            });

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/');
        });

        it('should NOT redirect to / when is null', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: null,
            });

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeFalsy();
        });

        it('should NOT redirect to / when is true', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: true,
            });

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeFalsy();
        });

        it('should render ShoppingCartConfirmProductsContainer when is true', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: true,
            });

            const container = renderedComponent.find(ShoppingCartConfirmProductsContainer);

            expect(container.exists()).toBeTruthy();
        });

        it('should render ShoppingCartConfirmIsDeliveryChosenContainer when is true', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: true,
            });

            const container = renderedComponent.find(ShoppingCartConfirmIsDeliveryChosenContainer);

            expect(container.exists()).toBeTruthy();
        });

        it('should render ShoppingCartConfirmPaymentContainer when is true', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: true,
            });

            const container = renderedComponent.find(ShoppingCartConfirmPaymentContainer);

            expect(container.exists()).toBeTruthy();
        });

        it('should render `Back to cart` link when is true', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);
            renderedComponent.setState({
                initialized: true,
                paymentExists: true,
            });

            const link = renderedComponent.find(Link);

            expect(link.exists()).toBeTruthy();
            expect(link.props().to).toBe('/cart');
        });
    });

    describe('loadPayment', () => {
        it('should be called on start', () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(parameters.loadPayment).toHaveBeenCalledTimes(1);
            expect(parameters.loadPayment).toHaveBeenCalledWith(parameters.match.params.token);
        });

        it('should set initailized', async () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ whatever: 'whatever' })),
            };
            renderedComponent = await shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(renderedComponent.state().initialized).toBeTruthy();
        });

        it('should set paymentExists = false, when payment does not exist', async () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ exists: false })),
            };
            renderedComponent = await shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(renderedComponent.state().paymentExists).toBeFalsy();
        });

        it('should set paymentExists = true, when payment does not exist', async () => {
            const parameters = {
                t: jest.fn(),
                match: { params: { token: 'example' } },
                loadPayment: jest.fn().mockReturnValueOnce(Promise.resolve({ exists: true })),
            };
            renderedComponent = await shallow(<ShoppingCartConfirmComponent {...parameters} />);

            expect(renderedComponent.state().paymentExists).toBeTruthy();
        });
    });
});
