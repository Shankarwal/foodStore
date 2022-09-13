import { useContext, useEffect, useState} from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnBumped, setBtnBumped] = useState(false);

  const {items} = ctx

  const btnClasses = `${classes.button} ${btnBumped ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0){
      return;
    }
    setBtnBumped(true);

    const timer = setTimeout(() => {
      setBtnBumped(false);
    }, 300)

    return () => {
      clearTimeout(timer)
    }
    
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{ctx.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
