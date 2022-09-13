import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

import mealsCover from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Foodie:)</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsCover} alt="Look at those Delicious dishes" />
      </div>
    </React.Fragment>
  );
};

export default Header;
