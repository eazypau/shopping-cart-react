import React from "react";
import PurchasedItem from "../components/PurchasedItem";
import { useStateValue } from "../ReactState/stateProvider";

export default function PurchaseHistory() {
	const [{ purchasedItems }, dispatch] = useStateValue();

	return (
		<div className="centerPageContent">
			<div>
				<h3 className="heading">Purchased History</h3>
				<hr />
			</div>
			<div>
				{purchasedItems.map((item, index) => {
					return <PurchasedItem props={item} key={index} />
				})}
			</div>
		</div>
	);
}
