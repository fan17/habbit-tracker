import React from 'react';
import { Button } from 'reactstrap';

export class ShoppingCartConfirmPaymentCodComponent extends React.Component {
    static confirm() {

    }

    render() {
        return (
            <div>
                <Button
                    data-test="confirm-payment-button"
                    onClick={() => this.constructor.confirm()}
                >
                    confirm & pay
                </Button>
            </div>
        );
    }
}

export default ShoppingCartConfirmPaymentCodComponent;
