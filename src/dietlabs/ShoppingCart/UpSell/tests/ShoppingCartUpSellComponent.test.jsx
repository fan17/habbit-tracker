import React from 'react';
import { shallow } from 'enzyme';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ShoppingCartUpSellProductContainer } from 'view/ShoppingCart/UpSell/ShoppingCartUpSellProductContainer';
import { ShoppingCartUpSellSummaryContainer } from 'view/ShoppingCart/UpSell/ShoppingCartUpSellSummaryContainer';
import {
    SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
    SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION,
} from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType';
import { ShoppingCartUpSellComponent } from '../ShoppingCartUpSellComponent';

describe('ShoppingCartUpSellComponent', () => {
    let renderedComponent;
    beforeAll(() => {
        const parameters = {
            t: jest.fn(),
            saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
            token: 'example',
            userSawUpSelling: false,
        };
        renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
    });

    it('should display `back to shop` link', () => {
        const link = renderedComponent.findWhere(element => (
            element.type() === Link
            && element.find('[data-test="back-to-shop-link"]').exists() === true
        ));
        expect(link.exists()).toBeTruthy();
        expect(link.props().to).toBe('/');
    });

    it('should contains ShoppingCartUpSellProductContainer', () => {
        const container = renderedComponent.findWhere(element => (
            element.type() === ShoppingCartUpSellProductContainer
        ));
        expect(container.exists()).toBeTruthy();
    });

    it('should contains ShoppingCartUpSellSummaryContainer', () => {
        const container = renderedComponent.findWhere(element => (
            element.type() === ShoppingCartUpSellSummaryContainer
        ));
        expect(container.exists()).toBeTruthy();
    });

    describe('shouldRedirectToConfirm', () => {
        it('should be false on start', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });

        it('should NOT redirect if false', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
            renderedComponent.setState({ shouldRedirectToConfirm: false });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });

        it('should NOT redirect if shouldRedirectToFirstStep is also set', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
            renderedComponent.setState({ shouldRedirectToFirstStep: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).not.toBe('/cart/confirm/example');
        });

        it('should redirect if true', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
            renderedComponent.setState({ shouldRedirectToConfirm: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).toBe('/cart/confirm/example');
        });
    });

    describe('shouldRedirectToFirstStep', () => {
        it('should be false on start', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            expect(renderedComponent.state().shouldRedirectToFirstStep).toBeFalsy();
        });

        it('should NOT redirect if false', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
            renderedComponent.setState({ shouldRedirectToFirstStep: false });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });

        it('should redirect if true', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);
            renderedComponent.setState({ shouldRedirectToFirstStep: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).toBe('/cart');
        });
    });

    describe('saveCart', () => {
        it('should display saveCart button', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            const saveCartButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="save-cart-button"]').exists() === true
            ));

            expect(saveCartButton.exists()).toBeTruthy();
            expect(saveCartButton).toHaveLength(1);
        });

        it('should call saveCart after click the button', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            const saveCartButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="save-cart-button"]').exists() === true
            )).first();

            saveCartButton.simulate('click', { preventDefault() {} });

            expect(parameters.saveCart).toHaveBeenCalledTimes(1);
        });

        it('should set state.shouldRedirectToConfirm on true', async () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve({ type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE })),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToConfirm).toBeTruthy();
            expect(renderedComponent.state().shouldRedirectToFirstStep).toBeFalsy();
        });

        it('should set state.shouldRedirectToFirstStep on true', async () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve({ type: SHOPPING_CART_INDEX_SAVE_VALIDATION_EXCEPTION })),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToFirstStep).toBeTruthy();
            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });

        it('should NOT set state.shouldRedirectToFirstStep or state.shouldRedirectToFirstStep', async () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: false,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToFirstStep).toBeFalsy();
            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });
    });

    describe('userSawUpSelling', () => {
        it('should redirect to confirm when is true', () => {
            const parameters = {
                t: jest.fn(),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                token: 'example',
                userSawUpSelling: true,
            };
            renderedComponent = shallow(<ShoppingCartUpSellComponent {...parameters} />);

            const redirect = renderedComponent.find(Redirect);

            expect(redirect.exists()).toBeTruthy();
            expect(redirect.props().to).toEqual('/cart/confirm/example');
        });
    });
});
