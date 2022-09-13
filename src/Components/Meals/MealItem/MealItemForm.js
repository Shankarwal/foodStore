import { useRef } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enterdValue = inputRef.current.value;
    const enterdValueNumber = +enterdValue;

    if (
      enterdValue.trim().length === 0 ||
      enterdValueNumber < 1 ||
      enterdValueNumber > 5
    ) {
      return;
    }

    props.onAddToCart(enterdValueNumber);
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <Input
        ref = {inputRef}
        label="Quantity"
        input={{
          id: "quantity",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }} 
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
