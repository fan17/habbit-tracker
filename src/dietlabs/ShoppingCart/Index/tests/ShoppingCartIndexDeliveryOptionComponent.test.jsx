import React from 'react';
import { shallow } from 'enzyme';
import InputRadio from 'components/FormElements/InputRadio';
import InputEmail from 'components/FormElements/InputEmail';
import InputCheckbox from 'components/FormElements/InputCheckbox';
import InputText from 'components/FormElements/InputText';
import ShoppingCartDeliveryOption from 'view/ShoppingCart/Delivery/Option/ShoppingCartDeliveryOption';
import ShoppingCartDelivery from 'view/ShoppingCart/Delivery/ShoppingCartDelivery';
import ShoppingCartUserData from 'view/ShoppingCart/UserData/ShoppingCartUserData';
import ValidationError from 'view/Validation/ValidationError';
import { ShoppingCartIndexDeliveryOptionComponent } from '../ShoppingCartIndexDeliveryOptionComponent';

describe('<ShoppingCartIndexDeliveryOptionComponent />', () => {
    let renderedComponent;

    it('should display delivery options', () => {
        const parameters = {
            userData: new ShoppingCartUserData(),
            setUserData: jest.fn(),
            isLoggedIn: false,
            t: jest.fn(),
            setDelivery: jest.fn(),
            delivery: new ShoppingCartDelivery(),
            setDeliveryOption: jest.fn(),
            saleShippingId: 123,
            deliveryOptions: [
                new ShoppingCartDeliveryOption(123, 'description'),
                new ShoppingCartDeliveryOption('example1', 'description1'),
                new ShoppingCartDeliveryOption('example2', 'description2'),
            ],
            areShippingDataNeeded: false,
            validationError: new ValidationError(),
        };
        renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

        const methods = renderedComponent.findWhere(element => (
            element.type() === InputRadio
            && element.find('[data-test="delivery-option"]').exists() === true
        ));

        expect(methods).toHaveLength(parameters.deliveryOptions.length);
    });

    it('should call `props.setDeliveryOption` when choose some payment method option', () => {
        const parameters = {
            userData: new ShoppingCartUserData(),
            setUserData: jest.fn(),
            isLoggedIn: false,
            t: jest.fn(),
            setDelivery: jest.fn(),
            delivery: new ShoppingCartDelivery(),
            setDeliveryOption: jest.fn(),
            saleShippingId: 123,
            deliveryOptions: [
                new ShoppingCartDeliveryOption(123, 'description'),
                new ShoppingCartDeliveryOption('example1', 'description1'),
                new ShoppingCartDeliveryOption('example2', 'description2'),
            ],
            areShippingDataNeeded: false,
            validationError: new ValidationError(),
        };
        renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

        expect(renderedComponent.find(InputRadio).first().props().setValue).toBe(parameters.setDeliveryOption);
    });

    describe('email', () => {
        it('should NOT display when user is logged in & `areShippingDataNeeded` is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputEmail
                && element.find('[data-test="email-input"]').exists() === true
            ));

            expect(input.exists()).toBeFalsy();
        });

        it('should NOT display input when user is logged in & `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputEmail
                && element.find('[data-test="email-input"]').exists() === true
            ));

            expect(input.exists()).toBeFalsy();
        });

        it('should display input when user is NOT logged in & `areShippingDataNeeded` is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputEmail
                && element.find('[data-test="email-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should display input when user is NOT logged in & `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputEmail
                && element.find('[data-test="email-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputEmail
                && element.find('[data-test="email-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().email).toBe('some-string');
            expect(parameters.setUserData).toHaveBeenCalledTimes(1);
            expect(parameters.setUserData).toHaveBeenCalledWith(
                new ShoppingCartUserData(
                    renderedComponent.state().email,
                    renderedComponent.state().acceptConditions
                )
            );
        });

        it('should be set on start if userData.email', () => {
            const parameters = {
                userData: new ShoppingCartUserData('example-email'),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().email).toBe('example-email');
        });
    });

    describe('acceptConditions', () => {
        it('should NOT display input when user is logged in & `areShippingDataNeeded` is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));

            expect(input.exists()).toBeFalsy();
        });

        it('should NOT display input when user is logged in & `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));

            expect(input.exists()).toBeFalsy();
        });

        it('should display input when user is NOT logged in & `areShippingDataNeeded` is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should display input when user is NOT logged in & `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should display input when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should be able to set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            renderedComponent.setState({ acceptConditions: false });
            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));
            input.props().setValue();
            expect(renderedComponent.state().acceptConditions).toBeTruthy();
            expect(parameters.setUserData).toHaveBeenCalledTimes(1);
            expect(parameters.setUserData).toHaveBeenCalledWith(
                new ShoppingCartUserData(
                    renderedComponent.state().email,
                    renderedComponent.state().acceptConditions
                )
            );
        });

        it('should be able to unset', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            renderedComponent.setState({ acceptConditions: true });
            const input = renderedComponent.findWhere(element => (
                element.type() === InputCheckbox
                && element.find('[data-test="accept-conditions-input"]').exists() === true
            ));
            input.props().setValue();
            expect(renderedComponent.state().acceptConditions).toBeFalsy();
            expect(parameters.setUserData).toHaveBeenCalledTimes(1);
            expect(parameters.setUserData).toHaveBeenCalledWith(
                new ShoppingCartUserData(
                    renderedComponent.state().email,
                    renderedComponent.state().acceptConditions
                )
            );
        });

        it('should be set on start if userData.acceptConditions', () => {
            const parameters = {
                userData: new ShoppingCartUserData(undefined, true),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: false,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().acceptConditions).toBe(true);
        });
    });

    describe('name', () => {
        it('should display when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="name-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should state value be empty on start', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().name).toBe('');
        });

        it('should state value be filled when user is logged in & user.name is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery('name'),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().name).toBe('name');
        });

        it('should state value be empty when user is logged in & user.name is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().name).toBe('');
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="name-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().name).toBe('some-string');
            expect(parameters.setDelivery).toHaveBeenCalledTimes(1);
            expect(parameters.setDelivery).toHaveBeenCalledWith(
                new ShoppingCartDelivery(
                    renderedComponent.state().name,
                    renderedComponent.state().address,
                    renderedComponent.state().postalCode,
                    renderedComponent.state().city,
                    renderedComponent.state().country,
                    renderedComponent.state().phone
                )
            );
        });
    });

    describe('postalCode', () => {
        it('should display when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="postal-code-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should state value be empty on start', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().postalCode).toBe('');
        });

        it('should state value be filled when user is logged in & user.postalCode is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(undefined, undefined, 'postalCode'),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().postalCode).toBe('postalCode');
        });

        it('should state value be empty when user is logged in & user.postalCode is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().postalCode).toBe('');
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="postal-code-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().postalCode).toBe('some-string');
            expect(parameters.setDelivery).toHaveBeenCalledTimes(1);
            expect(parameters.setDelivery).toHaveBeenCalledWith(
                new ShoppingCartDelivery(
                    renderedComponent.state().name,
                    renderedComponent.state().address,
                    renderedComponent.state().postalCode,
                    renderedComponent.state().city,
                    renderedComponent.state().country,
                    renderedComponent.state().phone
                )
            );
        });
    });

    describe('address', () => {
        it('should display when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="address-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should state value be empty on start', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().address).toBe('');
        });

        it('should state value be filled when user is logged in & user.address is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(undefined, 'address'),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().address).toBe('address');
        });

        it('should state value be empty when user is logged in & user.address is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().address).toBe('');
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="address-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().address).toBe('some-string');
            expect(parameters.setDelivery).toHaveBeenCalledTimes(1);
            expect(parameters.setDelivery).toHaveBeenCalledWith(
                new ShoppingCartDelivery(
                    renderedComponent.state().name,
                    renderedComponent.state().address,
                    renderedComponent.state().postalCode,
                    renderedComponent.state().city,
                    renderedComponent.state().country,
                    renderedComponent.state().phone
                )
            );
        });
    });

    describe('city', () => {
        it('should display when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="city-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should state value be empty on start', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().city).toBe('');
        });

        it('should state value be filled when user is logged in & user.city is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(undefined, undefined, undefined, 'city'),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().city).toBe('city');
        });

        it('should state value be empty when user is logged in & user.city is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().city).toBe('');
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="city-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().city).toBe('some-string');
            expect(parameters.setDelivery).toHaveBeenCalledTimes(1);
            expect(parameters.setDelivery).toHaveBeenCalledWith(
                new ShoppingCartDelivery(
                    renderedComponent.state().name,
                    renderedComponent.state().address,
                    renderedComponent.state().postalCode,
                    renderedComponent.state().city,
                    renderedComponent.state().country,
                    renderedComponent.state().phone
                )
            );
        });
    });

    describe('phone', () => {
        it('should display when `areShippingDataNeeded` is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="phone-input"]').exists() === true
            ));

            expect(input.exists()).toBeTruthy();
        });

        it('should state value be empty on start', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: false,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };
            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().phone).toBe('');
        });

        it('should state value be filled when user is logged in & user.phone is set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(undefined, undefined, undefined, undefined, undefined, 'phone'),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().phone).toBe('phone');
        });

        it('should state value be empty when user is logged in & user.phone is NOT set', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);

            expect(renderedComponent.state().phone).toBe('');
        });

        it('should change state when type data', () => {
            const parameters = {
                userData: new ShoppingCartUserData(),
                setUserData: jest.fn(),
                isLoggedIn: true,
                t: jest.fn(),
                setDelivery: jest.fn(),
                delivery: new ShoppingCartDelivery(),
                setDeliveryOption: jest.fn(),
                saleShippingId: 1,
                deliveryOptions: [],
                areShippingDataNeeded: true,
                validationError: new ValidationError(),
            };

            renderedComponent = shallow(<ShoppingCartIndexDeliveryOptionComponent {...parameters} />);
            const input = renderedComponent.findWhere(element => (
                element.type() === InputText
                && element.find('[data-test="phone-input"]').exists() === true
            ));
            input.props().setValue('some-string');
            expect(renderedComponent.state().phone).toBe('some-string');
            expect(parameters.setDelivery).toHaveBeenCalledTimes(1);
            expect(parameters.setDelivery).toHaveBeenCalledWith(
                new ShoppingCartDelivery(
                    renderedComponent.state().name,
                    renderedComponent.state().address,
                    renderedComponent.state().postalCode,
                    renderedComponent.state().city,
                    renderedComponent.state().country,
                    renderedComponent.state().phone
                )
            );
        });
    });
});
