import gql from 'graphql-tag'

const query = gql`
    query ShoppingCartIndexLoad {
        sale {
            productVariants {
                id
                name
                saleProduct {
                    promoPrice
                    catalogPrice
                    regularPrice
                    finalPromoPrice {
                        amount
                        currency
                    }
                    finalCatalogPrice {
                        amount
                        currency
                    }
                    finalRegularPrice {
                        amount
                        currency
                    }
                    isVirtual
                    containsDiet
                    containsWorkout
                }
            }
            shippingOptions {
                id
                name
                onlyVirtualProducts
                requiresAddress
                price {
                  amount
                  currency
                }
                countries {
                  code
                  name
                }
            } 
        }
        me {
            shipping {
                name
                address: street
                postalCode
                city
                phone
                country {
                    code
                }
            }  
        }
    }
`

export default query
