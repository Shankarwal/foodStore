import React from "react";

const CartContext = React.createContext({
    items : [],
    totalAmount : 0,
    isAuthenticated : false,
    addItem : (item) => {},
    removeItem : (item) => {},
    updateItem : (item) => {},
    clearCart : () => {}
});

export default CartContext;