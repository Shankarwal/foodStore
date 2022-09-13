import { useState, useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);

  const hasItems = ctx.items.length > 0;

  const itemRemoveHandler = (item) => {
    if (item.quantity === 1) {
      ctx.removeItem(item);
      return;
    }

    ctx.updateItem({
      name: item.name,
      quantity: item.quantity - 1,
      price: item.price,
    });
  };

  const itemAddHandler = (item) => {
    if (item.quantity === 5) {
      return;
    }

    ctx.updateItem({
      name: item.name,
      quantity: item.quantity + 1,
      price: item.price,
    });
    // ctx.updateItem({
    //   name: item.name,
    //   quantity : item.quantity +1,
    //   price : item.price
    // });
  };

  const formHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://foodstore-aa082-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: ctx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={itemRemoveHandler.bind(null, item)}
          onAdd={itemAddHandler.bind(null, item)}
        />
        // <li key={Math.random()*100}>{item.name}${item.price}x{item.quantity}</li>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button onClick={formHandler} className={classes.button}>
          order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toString()}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={submitOrderHandler} onClick={props.onHideCart} />
      )}
      {!showForm && modalActions}
    </>
  );

  const didSubmitOrder = <>
    <p>order placed successfully thank you for dining with us</p>
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
    </div>
  </>

  return <Modal onHideCart={props.onHideCart}>
    {!isSubmitting && !didSubmit && modalContent}
    {isSubmitting && <p>Placing your order Please wait....</p>}
    {didSubmit && didSubmitOrder}
  </Modal>;
};

export default Cart;
