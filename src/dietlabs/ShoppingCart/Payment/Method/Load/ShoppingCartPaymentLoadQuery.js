import gql from 'graphql-tag'

const query = gql`
    query SaleOperators {
        sale {
        operators {
            id
            name
            methods {
            id
            name
            channels {
                id
                name
                standalone
            }
            }
        }
        }
    }
`

export default query
