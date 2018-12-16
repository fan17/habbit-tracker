import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, FormGroup, Alert, Collapse, Input,
} from 'reactstrap';
import { withLocale } from 'TranslatorContext';
import ShoppingCartDeliveryOption from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOption';
import ShoppingCartDelivery from 'view/ShoppingCart/Delivery/ShoppingCartDelivery';
import ShoppingCartUserData from 'view/ShoppingCart/UserData/ShoppingCartUserData';
import ValidationError from 'view/Validation/ValidationError';
import InputRadio from 'components/FormElements/InputRadio';
import InputEmail from 'components/FormElements/InputEmail';
import InputCheckbox from 'components/FormElements/InputCheckbox';
import InputText from 'components/FormElements/InputText';

export class ShoppingCartIndexDeliveryOptionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.userData.email || '',
            acceptConditions: this.props.userData.acceptConditions || false,
            acceptConditionsCollapse: false,
            name: this.props.delivery.name || '',
            address: this.props.delivery.address || '',
            postalCode: this.props.delivery.postalCode || '',
            city: this.props.delivery.city || '',
            phone: this.props.delivery.phone || '',
            countryCode: this.props.delivery.countryCode || '',
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            acceptConditionsCollapse: !prevState.acceptConditionsCollapse,
        }));
    }

    changeDelivery(deliveryFragment) {
        this.setState({ ...deliveryFragment }, () => {
            const newDelivery = new ShoppingCartDelivery(
                this.state.name,
                this.state.address,
                this.state.postalCode,
                this.state.city,
                this.state.countryCode,
                this.state.phone
            );

            this.props.setDelivery(newDelivery);
        });
    }

    changeUserData(userDataFragment) {
        this.setState({ ...userDataFragment }, function () { //eslint-disable-line
            const newUserData = new ShoppingCartUserData(
                this.state.email,
                this.state.acceptConditions
            );

            this.props.setUserData(newUserData);
        });
    }

    render() {
        return (
            <section className="payment-method">
                <Container>
                    <h2>{this.props.t('cart/payment-method')}</h2>

                    <FormGroup tag="fieldset">
                        {this.props.deliveryOptions.map(method => (
                            <InputRadio
                                key={method.name}
                                data-test="delivery-option"
                                label={method.name}
                                name="saleShippingId"
                                value={method.id}
                                setValue={this.props.setDeliveryOption}
                                checked={this.props.saleShippingId === method.id}
                            />
                        ))}
                    </FormGroup>

                    <Alert color="success">
                        {this.props.t('cart/free-delivery-info')}
                    </Alert>

                    {this.props.validationError.occured
                        ? (
                            <Alert color="danger">
                                {this.props.t('error-occured')}
                            </Alert>
                        ) : ''
                    }
                    {this.props.areShippingDataNeeded ? this.renderFormCashOnDelivery() : this.renderFormDeliveryOnline()}
                </Container>
            </section>
        );
    }

    renderFormDeliveryOnline() {
        if (this.props.isLoggedIn) return '';

        return (
            <React.Fragment>
                {this.renderEmailField()}
                {this.renderAcceptConditionField()}
            </React.Fragment>
        );
    }

    renderFormCashOnDelivery() {
        return (
            <React.Fragment>
                <InputText
                    label={this.props.t('cart/delivery/name')}
                    name="name"
                    value={this.state.name}
                    placeholder={this.props.t('cart/delivery/name')}
                    errors={this.props.validationError}
                    setValue={name => this.changeDelivery({ name })}
                    required
                    data-test="name-input"
                />
                <InputText
                    label={this.props.t('cart/delivery/street')}
                    name="address"
                    value={this.state.address}
                    placeholder={this.props.t('cart/delivery/street')}
                    errors={this.props.validationError}
                    setValue={address => this.changeDelivery({ address })}
                    required
                    data-test="address-input"
                />
                <InputText
                    label={this.props.t('cart/delivery/postal-code')}
                    name="postalCode"
                    value={this.state.postalCode}
                    placeholder={this.props.t('cart/delivery/postal-code')}
                    errors={this.props.validationError}
                    setValue={postalCode => this.changeDelivery({ postalCode })}
                    required
                    data-test="postal-code-input"
                />
                <InputText
                    label={this.props.t('cart/delivery/city')}
                    name="city"
                    value={this.state.city}
                    placeholder={this.props.t('cart/delivery/city')}
                    errors={this.props.validationError}
                    setValue={city => this.changeDelivery({ city })}
                    required
                    data-test="city-input"
                />
                <InputText
                    label={this.props.t('cart/delivery/phone')}
                    name="phone"
                    value={this.state.phone}
                    placeholder={this.props.t('cart/delivery/phone')}
                    errors={this.props.validationError}
                    setValue={phone => this.changeDelivery({ phone })}
                    required
                    data-test="phone-input"
                />
                {/* // TODO */}
                <Input
                    type="select"
                    name="countryCode"
                    onChange={event => this.changeDelivery({ countryCode: event.target.value })}
                    defaultValue={this.state.countryCode}
                >
                    {this.props.chosenDeliveryOption
                        ? Object.keys(this.props.chosenDeliveryOption.countries).map(countryCode => (
                            <option
                                key={countryCode}
                                value={countryCode}
                            >
                                {this.props.chosenDeliveryOption.countries[countryCode]}
                            </option>
                        ))
                        : ''
                    }
                </Input>
                {!this.props.isLoggedIn ? this.renderEmailField() : ''}
                {!this.props.isLoggedIn ? this.renderAcceptConditionField() : ''}
            </React.Fragment>
        );
    }

    renderEmailField() {
        return (
            <InputEmail
                label={this.props.t('email')}
                name="email"
                value={this.state.email}
                placeholder={this.props.t('email')}
                errors={this.props.validationError}
                setValue={email => this.changeUserData({ email })}
                required
                data-test="email-input"
            />
        );
    }

    renderAcceptConditionField() {
        return (
            <InputCheckbox
                label={[
                    this.props.t('cart/accept-condition/text'),
                    <a style={this.state.acceptConditionsCollapse ? { display: 'none' } : {}} onClick={this.toggle}>
                        {' '}
                        {this.props.t('read-more')}
                    </a>,
                    <Collapse isOpen={this.state.acceptConditionsCollapse}>
                        &nbsp;
                        {this.props.t('cart/accept-condition/text-more')}
                    </Collapse>,
                ]}
                name="acceptConditions"
                value={this.state.acceptConditions}
                setValue={() => this.changeUserData({ acceptConditions: !this.state.acceptConditions })}
                errors={this.props.validationError}
                checked={this.state.acceptConditions}
                data-test="accept-conditions-input"
                required
            />
        );
    }
}

ShoppingCartIndexDeliveryOptionComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    setDeliveryOption: PropTypes.func.isRequired,
    saleShippingId: PropTypes.number,
    deliveryOptions: PropTypes.arrayOf(PropTypes.instanceOf(ShoppingCartDeliveryOption)).isRequired,
    areShippingDataNeeded: PropTypes.bool.isRequired,
    setDelivery: PropTypes.func.isRequired,
    delivery: PropTypes.instanceOf(ShoppingCartDelivery).isRequired,
    setUserData: PropTypes.func.isRequired,
    userData: PropTypes.instanceOf(ShoppingCartUserData).isRequired,
    validationError: PropTypes.instanceOf(ValidationError).isRequired,
    chosenDeliveryOption: PropTypes.instanceOf(ShoppingCartDeliveryOption),
};

export default withLocale(ShoppingCartIndexDeliveryOptionComponent);
