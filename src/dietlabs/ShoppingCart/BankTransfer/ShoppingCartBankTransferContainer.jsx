import { connect } from 'react-redux'
import ShoppingCartBankTransferComponent from 'components/ShoppingCart/BankTransfer/ShoppingCartBankTransferComponent'
import { paymentLoadByToken } from 'dietlabs/ShoppingCart/BankTransfer/ShoppingCartBankTransferComponent'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    loadPayment: token => dispatch(paymentLoadByToken(token)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShoppingCartBankTransferComponent)
