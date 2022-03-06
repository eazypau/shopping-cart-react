import React, { useRef } from "react";

export default function ItemCart({ props, updateCartItem, removeItemFromCart }) {
	const selectedQty = useRef(Number(props.selectedQuantity));

	const updateSubTotal = () => {
		console.log("updating");
		const currentItem = props;
		currentItem.selectedQuantity = Number(selectedQty.current.value);
		currentItem.subTotal = selectedQty.current.value * props.pricePerItem;
		console.log(currentItem);
		updateCartItem(currentItem);
	};

	const removeItem = () => {
		console.log("removing");
		removeItemFromCart(props.id)
	};

	return (
		<div className="cartItemContainer">
			<div className="cartItemImgContainer">
				<img src={props.imgUrl} alt={props.name} className="imgSizing" />
			</div>
			<div className="itemDetailsContainer">
				<div>
					<p style={{ marginTop: "10px", marginBottom: "5px" }}>{props.name}</p>
					<p style={{ marginTop: "5px" }}>
						${props.pricePerItem}{" "}
						{props.discount ? <span className="discountedLabel">[Discounted price]</span> : ""}
					</p>
				</div>
				<div className="itemInputAndTotal">
					{/* qty choosing input */}
					<div style={{ marginBottom: "10rem" }}>
						<input
							type="number"
							className="quantityInput"
							min={1}
							max={props.availableStockQty}
							defaultValue={props.selectedQuantity}
							ref={selectedQty}
							onInput={updateSubTotal}
						/>
					</div>
					<p className="totalItemPrice">Subtotal: ${props.subTotal}.00</p>
					{/* current total for that item */}
				</div>
				<div className="trashIcon" onClick={removeItem}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-trash3"
						viewBox="0 0 16 16"
					>
						<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
					</svg>
				</div>
			</div>
		</div>
	);
}
