import {Fragment, useContext} from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (quantity) => {
    const newItem = {
      id: props.id,
      name: props.name,
      quantity: quantity,
      price : props.price,
    };

    const filteredItems = ctx.items.filter(
      (item) => item.name === newItem.name
    );
    const [item] = filteredItems;
    if (filteredItems.length > 0 && item.quantity !== newItem.quantity) {
      ctx.updateItem(newItem);
    } else if (filteredItems.length === 0) {
      ctx.addItem(newItem);
    }
  };

  return (
    <Fragment>
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler} />
        </div>
      </li>
    </Fragment>
  );
};

export default MealItem;
