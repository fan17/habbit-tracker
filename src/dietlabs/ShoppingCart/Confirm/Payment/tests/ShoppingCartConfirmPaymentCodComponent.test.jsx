import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import { ShoppingCartConfirmPaymentCodComponent } from '../ShoppingCartConfirmPaymentCodComponent';

describe('ShoppingCartConfirmPaymentCodComponent', () => {
    let renderedComponent = null;

    beforeAll(() => {
        const parameters = {};
        renderedComponent = shallow(<ShoppingCartConfirmPaymentCodComponent {...parameters} />);
    });

    describe('confirm', () => {
        it('button should be visible', () => {
            const button = renderedComponent.find(Button).find('[data-test="confirm-payment-button"]');
            expect(button).toHaveLength(1);
        });
    });
});
