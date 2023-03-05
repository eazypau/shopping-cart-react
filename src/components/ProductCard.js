import React from "react";

export default function ProductCard({ props, selectItem }) {
	const selectedProduct = (id) => {
		selectItem(id);
	};
	
	const setDefaultImage = (e) => {
		try {
			// console.log(e);
			e.target.onerror = null;
			e.target.src =
				"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		} catch (error) {
			
		}
	};

	return (
		<div
			className={props.quantity === 0 ? "cardContainer--soldOut" : "cardContainer"}
			onClick={() => {
				selectedProduct(props.id);
			}}
		>
			<div className="productImgContainer">
				<img src={props.imgUrl} alt={props.name} className="imgSizing" onError={(e) => setDefaultImage(e)} />
			</div>
			<div className="cardTextContainer">
				{props.topDeals ? <p className="discount">Top Deals</p> : ""}

				{/* <p className="productPrice"> */}
					{props.quantity < 21 ? <span>&#128293;</span> : ""}
					{props.discount ? (
						<span>
							<span className="lineThroughPrice">${props.price}.00</span> ${props.price - 100}.00<span></span>
						</span>
					) : (
						<span>${props.price}.00</span>
					)}
				{/* </p> */}
				<p className="productTitle">{props.name}</p>
			</div>
			{props.quantity === 0 ? (
				<div className="soldOutContainer">
					{" "}
					<p className="soldOut">Sold Out</p>{" "}
				</div>
			) : (
				""
			)}

			{/* need add a conditional rendering for item qty less than 10 */}
			{/* and also for sold out item, maybe a ribbon */}
		</div>
	);
}
