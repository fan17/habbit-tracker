import React from 'react';
import { shallow } from 'enzyme';
import ShoppingCartConfirmPaymentCodContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentCodContainer';
import ShoppingCartConfirmPaymentOnlineContainer from 'view/ShoppingCart/Confirm/Payment/ShoppingCartConfirmPaymentOnlineContainer';
import { ShoppingCartConfirmPaymentComponent } from '../ShoppingCartConfirmPaymentComponent';

describe('ShoppingCartConfirmPaymentComponent', () => {
    let renderedComponent = null;

    it('should return ShoppingCartConfirmPaymentCodContainer if isCod is true', () => {
        const parameters = {
            isCod: true,
            token: 'example-token',
        };
        renderedComponent = shallow(
            <ShoppingCartConfirmPaymentComponent {...parameters} />
        );

        expect(
            renderedComponent
                .find(ShoppingCartConfirmPaymentCodContainer)
                .exists()
        ).toBeTruthy();
        expect(
            renderedComponent
                .find(ShoppingCartConfirmPaymentOnlineContainer)
                .exists()
        ).toBeFalsy();
    });

    it('should return ShoppingCartConfirmPaymentOnlineContainer if isCod is false', () => {
        const parameters = {
            isCod: false,
            token: 'example-token',
        };
        renderedComponent = shallow(
            <ShoppingCartConfirmPaymentComponent {...parameters} />
        );

        expect(
            renderedComponent
                .find(ShoppingCartConfirmPaymentOnlineContainer)
                .exists()
        ).toBeTruthy();
        expect(
            renderedComponent
                .find(ShoppingCartConfirmPaymentOnlineContainer)
                .props().token
        ).toEqual('example-token');
        expect(
            renderedComponent
                .find(ShoppingCartConfirmPaymentCodContainer)
                .exists()
        ).toBeFalsy();
    });
});
