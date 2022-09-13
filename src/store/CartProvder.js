import { useReducer } from 'react';
import CartContext from './cart-context'

const defaultState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD"){
        const updatedItems = state.items.concat([action.item])
        const subtotal = action.item.quantity * action.item.price
        const updatedTotal = parseFloat(state.totalAmount) + parseFloat(subtotal)
        return {
            items : updatedItems,
            totalAmount : updatedTotal.toFixed(2)
        }
    }

    if (action.type === "UPDATE") {
        let change;
        const updatedItems = state.items.map(item => { 
            if (item.name === action.item.name) {
                change = action.item.quantity - item.quantity 
                item.quantity = action.item.quantity;
            }
            return item
        })
        const updatedTotal = parseFloat(state.totalAmount) + parseFloat(change * action.item.price)
        return {
            items : updatedItems,
            totalAmount : updatedTotal.toFixed(2)
        }
    }
    
    if (action.type === 'REMOVE') {
        const updatedItems = state.items.filter(item =>  item.id !== action.item.id)
        const updatedTotal = parseFloat(state.totalAmount) - parseFloat(action.item.price)
        return {
            items : updatedItems,
            totalAmount : updatedTotal.toFixed(2)
        } 
    }

    if (action.type === 'CLEAR') {
        return defaultState
    }
    return defaultState 
}

const CartProvider = props => {
    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);

    const addItemHandler = item => {
        dispatchCartState({type : "ADD", item : item})
    }

    const removeItemHandler = item => {
        dispatchCartState({type : "REMOVE", item : item })
    }

    const updateItemHandler = item => {
        dispatchCartState({ type : "UPDATE", item : item })
    }

    const claerCartHandler = () => {
        dispatchCartState({type : 'CLEAR'})
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemHandler,
        removeItem : removeItemHandler,
        updateItem : updateItemHandler,
        clearCart : claerCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;