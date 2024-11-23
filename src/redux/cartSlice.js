import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items: [],
    totalQuantity: 0,

}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state,action)=>{
            const existingItem = state.items.find(item=>item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity+= action.payload.quantity;
            }else{
                state.items.push({...action.payload,quantity:action.payload.quantity})
            }
            state.totalQuantity+= action.payload.quantity;
        },
        removeFromCart:(state,action)=>{
            const itemIndex = state.items.findIndex(item=>item.id === action.payload.id)
            if(itemIndex>=0){
                state.totalQuantity-=state.items[itemIndex].quantity;
                state.items.splice(itemIndex,1)
            }
        },
        updateQuantity: (state,action)=>{
            const existingItem = state.items.find(item=>item.id === action.payload.id);
            if (existingItem) {
                state.totalQuantity += action.payload.change;
                existingItem.quantity += action.payload.change;
              }
        }
    }
})
export const {addToCart,removeFromCart,updateQuantity}= cartSlice.actions;
export default cartSlice.reducer;