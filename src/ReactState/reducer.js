export const initialState = {
	cartItems: [],
	purchasedItems: [],
};

const reducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case "ADD_TO_CART":
			// console.log("called Add to cart");
			return { ...state, cartItems: [...state.cartItems, action.payload] };
		case "REMOVE_FROM_CART":
			// console.log("called remove from cart");
			const { id } = action.payload;
			let newCart = [...state.cartItems];
			const index = newCart.findIndex((item) => item.id === id);
			newCart.splice(index, 1);
			return { ...state, cartItems: [...newCart] };
		case "UPDATE_ITEM_QTY":
			// console.log("called update item");
			const { updatedItem } = action.payload;
			let currentCart = [...state.cartItems];
			console.log("before....", currentCart);
			const itemIndex = currentCart.findIndex((item) => item.name === updatedItem.name);
			// console.log(itemIndex);
			// replace previous item with the latest update
			currentCart[itemIndex] = updatedItem;
			console.log("after...", currentCart);
			return { ...state, cartItems: [...currentCart] };
		case "CHECK_OUT":
			// console.log("called Add to cart");
			return { ...state, cartItems: [], purchasedItems: [...state.purchasedItems, ...state.cartItems] };
		default:
			return state;
	}
};

export default reducer;
