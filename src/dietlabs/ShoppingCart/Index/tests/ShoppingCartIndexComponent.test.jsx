import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';
import { SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE } from 'view/ShoppingCart/Index/Save/ShoppingCartIndexSaveActionType';
import { ShoppingCartIndexComponent } from '../ShoppingCartIndexComponent';

describe('<ShoppingCartIndexComponent />', () => {
    let renderedComponent;

    describe('initialized', () => {
        it('should return placeholder when `initialized` is NOT set', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: false });

            const placeholder = renderedComponent.findWhere(element => (
                element.find('[data-test="shopping-cart-index-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeTruthy();
        });

        it('should NOT return placeholder when `initialized` is set', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const placeholder = renderedComponent.findWhere(element => (
                element.find('[data-test="shopping-cart-index-placeholder"]').exists() === true
            ));
            expect(placeholder.exists()).toBeFalsy();
        });

        it('`state.initialized` should be `false` on start', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: false,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            expect(renderedComponent.state().initialized).toBeFalsy();
        });
    });

    describe('load', () => {
        it('should call `load` on start', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: false,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            expect(parameters.load).toHaveBeenCalled();
        });

        it('`state.initialized` should be `true` after successful `load`', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: false,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            parameters.load().then(() => {
                renderedComponent.update();
                expect(renderedComponent.state().initialized).toBeTruthy();
            });
        });
    });

    describe('shouldRedirectToConfirm', () => {
        it('should be false on start', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });

        it('should NOT redirect if false', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true, shouldRedirectToConfirm: false });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });

        it('should NOT redirect if shouldRedirectToUpSell is also set', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true, shouldRedirectToUpSell: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).not.toBe('/cart/confirm/example');
        });

        it('should redirect if true', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true, shouldRedirectToConfirm: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).toBe('/cart/confirm/example');
        });
    });

    describe('shouldRedirectToUpSell', () => {
        it('should be false on start', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            expect(renderedComponent.state().shouldRedirectToUpSell).toBeFalsy();
        });

        it('should NOT redirect if false', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true, shouldRedirectToUpSell: false });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });

        it('should redirect if true', () => {
            const parameters = {
                token: 'example',
                load: () => Promise.resolve().then(() => ('whatever')),
                saveCart: () => Promise.resolve().then(() => ('whatever')),
                t: jest.fn(),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true, shouldRedirectToUpSell: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).toBe('/cart/upsell');
        });
    });

    describe('areThereSomeProductsInCart', () => {
        it('should redirect if true', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: false,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            expect(renderedComponent.find(Redirect).exists()).toBeTruthy();
            expect(renderedComponent.find(Redirect).props().to).toEqual('/');
        });

        it('should NOT redirect if false', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });

        it('should NOT redirect when `initialized` is NOT set', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: false });

            expect(renderedComponent.find(Redirect).exists()).toBeFalsy();
        });
    });

    describe('saveCart', () => {
        it('should NOT display saveCart button when state.initialized is false', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: false });

            const saveCartButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="save-cart-button"]').exists() === true
            ));

            expect(saveCartButton.exists()).toBeFalsy();
        });

        it('should display saveCart button', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const saveCartButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="save-cart-button"]').exists() === true
            ));

            expect(saveCartButton.exists()).toBeTruthy();
            expect(saveCartButton).toHaveLength(1);
        });

        it('should call saveCart after click the button', () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);
            renderedComponent.setState({ initialized: true });

            const saveCartButton = renderedComponent.findWhere(element => (
                element.type() === Button
                && element.find('[data-test="save-cart-button"]').exists() === true
            )).first();

            saveCartButton.simulate('click', { preventDefault() {} });

            expect(parameters.saveCart).toHaveBeenCalledTimes(1);
        });

        it('should set state.shouldRedirectToConfirm on true', async () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                    upSellProducts: [],
                })),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToConfirm).toBeTruthy();
            expect(renderedComponent.state().shouldRedirectToUpSell).toBeFalsy();
        });

        it('should set state.shouldRedirectToUpSell on true', async () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve({
                    type: SHOPPING_CART_INDEX_SAVE_SUCCESS_RECEIVED_RESPONSE,
                    upSellProducts: ['one-element-array'],
                })),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToUpSell).toBeTruthy();
            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });

        it('should NOT set state.shouldRedirectToUpSell or state.shouldRedirectToUpSell', async () => {
            const parameters = {
                token: 'example',
                t: jest.fn(),
                load: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                saveCart: jest.fn().mockReturnValueOnce(Promise.resolve('whatever')),
                areThereSomeProductsInCart: true,
            };
            renderedComponent = shallow(<ShoppingCartIndexComponent {...parameters} />);

            await renderedComponent.instance().saveCart();

            expect(renderedComponent.state().shouldRedirectToUpSell).toBeFalsy();
            expect(renderedComponent.state().shouldRedirectToConfirm).toBeFalsy();
        });
    });
});
