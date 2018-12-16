import ShoppingCartPaymentMethod from 'view/ShoppingCart/Payment/Method/ShoppingCartPaymentMethod'
import ShoppingCartPaymentMethodOption from 'view/ShoppingCart/Payment/Method/Option/ShoppingCartPaymentMethodOption'
import { shoppingCartPaymentMethodLoadParseResponse } from '../ShoppingCartPaymentLoadParseResponse'

describe('ShoppingCartPaymentLoadParseResponse', () => {
    describe('should be empty array when', () => {
        it('empty rawOperator', () => {
            const rawOperators = []
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = []

            expect(result).toEqual(expected)
        })

        it('operator without any method', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example',
                    methods: [],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = []

            expect(result).toEqual(expected)
        })
    })

    describe('operator with method', () => {
        it('should be 1 method', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example operator',
                    methods: [
                        {
                            id: 100,
                            name: 'example method',
                            channels: [],
                        },
                    ],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = [
                new ShoppingCartPaymentMethod(100, undefined, 'example method'),
            ]

            expect(result).toEqual(expected)
        })

        it('should be few methods', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example operator',
                    methods: [
                        {
                            id: 100,
                            name: 'example method',
                            channels: [],
                        },
                        {
                            id: 101,
                            name: 'example method1',
                            channels: [],
                        },
                        {
                            id: 102,
                            name: 'example method2',
                            channels: [],
                        },
                    ],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = [
                new ShoppingCartPaymentMethod(100, undefined, 'example method'),
                new ShoppingCartPaymentMethod(
                    101,
                    undefined,
                    'example method1',
                ),
                new ShoppingCartPaymentMethod(
                    102,
                    undefined,
                    'example method2',
                ),
            ]

            expect(result).toEqual(expected)
        })
    })

    describe('operator with methods with channels', () => {
        it('should be standalone channel', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example operator',
                    methods: [
                        {
                            id: 100,
                            name: 'example method',
                            channels: [
                                {
                                    id: 200,
                                    name: 'example channel',
                                    standalone: true,
                                },
                            ],
                        },
                    ],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = [
                new ShoppingCartPaymentMethod(100, 200, 'example channel'),
            ]

            expect(result).toEqual(expected)
        })

        it('should few standalone channels and method', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example operator',
                    methods: [
                        {
                            id: 100,
                            name: 'example method',
                            channels: [
                                {
                                    id: 200,
                                    name: 'example channel',
                                    standalone: true,
                                },
                                {
                                    id: 201,
                                    name: 'example channel1',
                                    standalone: true,
                                },
                            ],
                        },
                    ],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = [
                new ShoppingCartPaymentMethod(100, 200, 'example channel'),
                new ShoppingCartPaymentMethod(100, 201, 'example channel1'),
            ]

            expect(result).toEqual(expected)
        })

        it('should standalone channel and method with option', () => {
            const rawOperators = [
                {
                    id: 10,
                    name: 'example operator',
                    methods: [
                        {
                            id: 100,
                            name: 'example method',
                            channels: [
                                {
                                    id: 200,
                                    name: 'example channel',
                                    standalone: true,
                                },
                                {
                                    id: 201,
                                    name: 'example channel1',
                                    standalone: false,
                                },
                            ],
                        },
                    ],
                },
            ]
            const result = shoppingCartPaymentMethodLoadParseResponse(
                rawOperators,
            )
            const expected = [
                new ShoppingCartPaymentMethod(100, 200, 'example channel'),
                new ShoppingCartPaymentMethod(
                    100,
                    undefined,
                    'example method',
                    [
                        new ShoppingCartPaymentMethodOption(
                            201,
                            'example channel1',
                        ),
                    ],
                ),
            ]

            expect(result).toEqual(expected)
        })
    })
})
