import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { PATHS } from 'config/paths';
import { ShoppingCartOrderDeliverySummaryComponent } from '../ShoppingCartOrderDeliverySummaryComponent';

describe('ShoppingCartOrderDeliverySummaryComponent', () => {
    let renderedComponent;
    beforeAll(() => {
        const parameters = {
            t: jest.fn(),
            name: 'example-name',
            address: 'example-address',
            postalCode: '11-111',
            city: 'Poznan',
            country: 'Poland',
            phone: '123123123',
        };
        renderedComponent = shallow(<ShoppingCartOrderDeliverySummaryComponent {...parameters} />);
    });

    describe('name', () => {
        it('should display', () => {
            const nameElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="name"]').exists() === true
            )).first();

            expect(nameElement.exists()).toBeTruthy();
            expect(nameElement.text()).toBe('example-name');
        });
    });

    describe('address', () => {
        it('should display', () => {
            const addressElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="address"]').exists() === true
            )).first();

            expect(addressElement.exists()).toBeTruthy();
            expect(addressElement.text()).toBe('example-address');
        });
    });

    describe('city', () => {
        it('should display', () => {
            const cityElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="city"]').exists() === true
            )).first();

            expect(cityElement.exists()).toBeTruthy();
            expect(cityElement.text()).toBe('Poznan');
        });
    });

    describe('postalCode', () => {
        it('should display', () => {
            const postalCodeElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="postalCode"]').exists() === true
            )).first();

            expect(postalCodeElement.exists()).toBeTruthy();
            expect(postalCodeElement.text()).toBe('11-111');
        });
    });

    describe('country', () => {
        it('should display', () => {
            const countryElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="country"]').exists() === true
            )).first();

            expect(countryElement.exists()).toBeTruthy();
            expect(countryElement.text()).toBe('Poland');
        });
    });

    describe('phone', () => {
        it('should display', () => {
            const phoneElement = renderedComponent.findWhere(element => (
                element.type() === 'span'
                && element.find('[data-test="phone"]').exists() === true
            )).first();

            expect(phoneElement.exists()).toBeTruthy();
            expect(phoneElement.text()).toBe('123123123');
        });
    });

    describe('change link', () => {
        it('should display', () => {
            const link = renderedComponent.findWhere(element => (
                element.type() === Link
                && element.find('[data-test="change"]').exists() === true
            )).first();

            expect(link.exists()).toBeTruthy();
            expect(link.props().to).toEqual(PATHS.CART.INDEX);
        });
    });
});
