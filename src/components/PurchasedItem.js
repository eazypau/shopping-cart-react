import React from "react";

export default function PurchasedItem({props}) {
	return (
		<div className="purchasedItemContainer">
			<div className="purchasedItemImgContainer">
				<img
					src={props.imgUrl}
					alt={props.name}
					className="imgSizing"
				/>
			</div>
			<div className="itemDetailsContainer">
				<div>
					<p style={{ marginTop: "10px", marginBottom: "5px" }}>{ props.name }</p>
					<p style={{ marginTop: "5px" }}>x {props.selectedQuantity}</p>
				</div>
				<p style={{marginTop: "auto", marginBottom: "auto"}}>${props.subTotal}.00</p>
			</div>
		</div>
	);
}
