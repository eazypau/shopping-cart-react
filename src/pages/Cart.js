import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import ItemCart from "../components/ItemCart";
import MessageModal from "../components/MessageModal";
import { useStateValue } from "../ReactState/stateProvider";

export default function Cart() {
	// let history = useHistory();
	const [{ cartItems }, dispatch] = useStateValue();

	const [currentTotal, setCurrentTotal] = useState(0);
	const [showMessageModal, setShowMessageModal] = useState(false);

	const updateCartItems = (updatedItem) => {
		const findItemIndex = cartItems.findIndex((item) => item.name === updatedItem.name);
		const selectedItem = cartItems[findItemIndex];
		selectedItem.selectedQuantity = updatedItem.selectedQuantity;
		selectedItem.subTotal = updatedItem.subTotal;
		dispatch({
			type: "UPDATE_ITEM_QTY",
			payload: {
				updatedItem: selectedItem,
			},
		});
	};

	const removeItemFromCart = (id) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: {
				id: id,
			},
		});
	};

	const openAndCloseMessageModal = () => {
		setShowMessageModal(true);
		setTimeout(() => {
			setShowMessageModal(false);
		}, 1200);
	};

	const checkOut = () => {
		dispatch({ type: "CHECK_OUT", payload: {} });
		// history.push("/purchase")
		openAndCloseMessageModal();
	};

	useEffect(() => {
		const itemsInCart = [...cartItems];
		if (itemsInCart.length > 0) {
			let total = 0;
			for (const item of itemsInCart) {
				total += item.subTotal;
			}
			setCurrentTotal(total);
		} else {
			setCurrentTotal(0);
		}
	}, [cartItems]);

	return (
		<div>
			{showMessageModal ? (
				<MessageModal text={"Thank you for making your purchase in Shopper Experience!"} />
			) : (
				""
			)}
			<div className="centerPageContent">
				<div>
					<h3 className="heading">My Cart</h3>
					<hr />
				</div>
				<div>
					{/* items */}
					{cartItems.map((item, index) => {
						return (
							<ItemCart
								props={item}
								updateCartItem={updateCartItems}
								removeItemFromCart={removeItemFromCart}
								key={index}
							/>
						);
					})}
					{/* show empty state if there is no item in the cart */}
					{cartItems.length === 0 ? (
						<div className="emptyStateContainer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="130"
								height="130"
								fill="currentColor"
								className="bi bi-cart-x"
								viewBox="0 0 16 16"
							>
								<path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
								<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
							</svg>
							<p className="emptyStateText">Your cart is empty</p>
						</div>
					) : (
						""
					)}
				</div>
				<div className="checkOutBar">
					<hr />
					<div>
						<button type="button" className="checkOutBtn" onClick={checkOut}>
							Check Out
						</button>
						<p className="totalPrice">Total: ${currentTotal}.00</p>
					</div>
				</div>
			</div>
		</div>
	);
}
