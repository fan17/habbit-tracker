import gql from 'graphql-tag'

const mutation = gql`
    mutation PaymentMake($token: String!, $methodId: Int!, $channelId: String) {
        sale {
            makePayment(
                token: $token
                methodId: $methodId
                channelId: $channelId
            ) {
                __typename
                ... on Payment {
                    id
                    token
                    url
                    isCod
                    isBankTransfer
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
