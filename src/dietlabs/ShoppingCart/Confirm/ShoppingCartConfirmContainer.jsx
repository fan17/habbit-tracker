import { connect } from 'react-redux'
import ShoppingCartConfirmComponent from 'components/ShoppingCart/Confirm/ShoppingCartConfirmComponent'
import { paymentLoadByToken } from 'view/Payment/Load/ByToken/PaymentLoadByTokenAction'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    loadPayment: token => dispatch(paymentLoadByToken(token)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShoppingCartConfirmComponent)
