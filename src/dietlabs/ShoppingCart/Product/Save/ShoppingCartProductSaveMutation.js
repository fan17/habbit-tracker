import gql from 'graphql-tag'

const mutation = gql`
mutation SalePaymentProductSave($products: [SaleProductVariantInputType!]!, $token: String) {
    sale {
      savePaymentProducts(products: $products, token: $token) {
        ...on Payment {
          id
          token
          price {
            amount
            currency
          }
        }
        ...on ValidationException {
          code
          messages
          details {
            fieldName
            messages
          }
        }
      }
    }
  }
`

export default mutation
