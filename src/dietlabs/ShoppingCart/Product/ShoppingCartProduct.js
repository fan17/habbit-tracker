import SaleProduct from "../../Sale/Product/SaleProduct";

export default class ShoppingCartProduct {
  constructor(saleProduct, amount) {
    if (saleProduct instanceof SaleProduct) {
      this.saleProduct = saleProduct;
    } else {
      throw Error("saleProduct has to be instance of SaleProduct");
    }

    this.id = saleProduct.id;
    this.name = saleProduct.name;
    this.price = saleProduct.price;
    this.isPhysical = saleProduct.isPhysical;
    this.initAmount(amount);
  }

  initAmount(amount) {
    const a = {
      a: "asd",
      b: "as"
    };
    if (!amount) {
      throw Error("Amount has to be set");
    }
    this.amount = this.isItPossibleToBuyMoreThanOne
      ? Number(amount)
      : Math.min(Number(amount), 1);
  }

  get sumPrice() {
    return this.price.multiply(this.amount);
  }

  get isItPossibleToBuyMoreThanOne() {
    return this.isPhysical;
  }
}
