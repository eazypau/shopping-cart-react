import React, { useRef, useState } from "react";
import { useStateValue } from "../ReactState/stateProvider";

export default function Modal({ props, closeModal, openAndCloseMessageModal }) {
	const [{ cartItems }, dispatch] = useStateValue();

	const qtyInput = useRef(1);
	const [total, setTotal] = useState(props.discount ? props.price - 100 : props.price);

	const closeModalWindow = () => {
		closeModal();
	};

	const addItemIntoCart = ({ item, qty, total }) => {
		const { id, name, imgUrl, discount, price, quantity } = item;
		const findItem = cartItems.findIndex((item) => item.id === id);
		console.log(findItem);
		if (findItem < 0) {
			// if this item is not in the cart, add this item
			const item = {
				id: id,
				name: name,
				imgUrl: imgUrl,
				discount: discount,
				selectedQuantity: qty,
				availableStockQty: quantity,
				pricePerItem: discount ? price - 100 : price,
				subTotal: total,
			};
			// console.log(item);
			dispatch({
				type: "ADD_TO_CART",
				payload: item,
			});
		} else {
			// if this item exist in the cart, update that item
			let item = cartItems[findItem];
			const currentQuantity = item.selectedQuantity;
			const newQuantity = currentQuantity + qty;
			item.selectedQuantity = newQuantity;
			item.subTotal = newQuantity * item.pricePerItem;
			// console.log(item);
			dispatch({
				type: "UPDATE_ITEM_QTY",
				payload: {
					updatedItem: item,
				},
			});
		}
		closeModal()
		openAndCloseMessageModal()
	};

	const updateTotal = () => {
		// console.log("update total");
		if (qtyInput.current.value >= props.quantity) {
			qtyInput.current.value = props.quantity;
		}
		if (props.discount) setTotal(qtyInput.current.value * (props.price - 100));
		else setTotal(qtyInput.current.value * props.price);
	};

	return (
		<div className="modalContainer">
			<div className="modal">
				<p className="closeBtn" onClick={closeModalWindow}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						fill="black"
						className="bi bi-x-circle"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				</p>
				<div className="modaImgContainer">
					<img src={props.imgUrl} alt={props.name} className="imgSizing" />
				</div>
				<div className="modalTextDetails">
					<div>
						{props.discount ? (
							<p className="modalPrice">
								<span className="lineThroughPrice">${props.price}.00</span> ${props.price - 100}.00
								<span></span>
							</p>
						) : (
							<p className="modalPrice">${props.price}.00</p>
						)}
						<p className="modalItemName">{props.name}</p>
					</div>
					<div className="inputAndTotal">
						<div style={{ marginBottom: "1rem" }}>
							<input
								type="number"
								className="qtyInput"
								ref={qtyInput}
								min={1}
								max={props.quantity}
								defaultValue={1}
								onInput={updateTotal}
							/>
						</div>
						<p className="totalPrice">Total: ${total}.00</p>
					</div>
					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<button
							type="button"
							className="addToCartBtn"
							onClick={() => {
								addItemIntoCart({
									item: props,
									qty: Number(qtyInput.current.value),
									total: total,
								});
							}}
						>
							Add To Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
