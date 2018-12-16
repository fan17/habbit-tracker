import gql from 'graphql-tag'

const mutation = gql`
mutation SalePaymentSave(
  $products: [SaleProductVariantInputType!]!
  $token: String
  $saleShippingId: Int!
  $email: String
  $acceptConditions: Boolean
  $name: String
  $address: String
  $city: String
  $postalCode: String
  $phone: String
  $countryCode: String
) {
  sale {
    savePayment(
      products: $products
      token: $token
      acceptConditions: $acceptConditions
      saleShippingId: $saleShippingId
      email: $email
      name: $name
      address: $address
      postalCode: $postalCode
      city: $city
      phone: $phone
      countryCode: $countryCode
    ) {
      __typename
      ... on Payment {
        id
        token
        price {
          amount
          currency
        }
        upSellProducts: crossSell {
          id
        }
      }
      ... on ValidationException {
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
