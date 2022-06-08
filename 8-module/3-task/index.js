export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
   if(product!=null){for (let key of this.cartItems){
      if(key.product.id==product.id){
        key.count +=1
        this.onProductUpdate()
        return
      }
      }
    let arr = {};
    arr.product = product;
    arr.count = 1;
   this.cartItems.push(arr) 
   this.onProductUpdate();}
  }
  updateProductCount(productId, amount) {
    this.cartItems.forEach((key,index)=>{
      if(key.product.id==productId){
        key.count +=amount
      }
      if(key.count==0){
        this.cartItems.splice(index,1)
      }
    })
    this.onProductUpdate();
  }

  isEmpty() {
    for(let key in this.cartItems){
      return false
    }
    return true
  }

  getTotalCount() {
    let summProduct = 0
    for (let key of this.cartItems){
      summProduct+=key.count
      }
      return summProduct
  }

  getTotalPrice() {
    let summPrice = 0
    for (let key of this.cartItems){
      summPrice += (key.count*key.product.price)
      }
      return summPrice
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
