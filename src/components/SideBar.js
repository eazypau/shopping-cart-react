import React, { useState } from "react";

export default function SideBar({ filterItems }) {
	const catergories = ["Sports", "Fruits", "Clothing", "Fashion", "Cooking", "Gadgets"];

	const [selected, setSelected] = useState(catergories.reduce((newObj, key) => ({ ...newObj, [key]: false }), {}));
	// console.log(selected);

	const checkSelected = (item) => {
		let checked = { ...selected };
		const ArrayKey = Object.keys(checked);
		let checkedKeyArray = []
		if (checked[item]) checked[item] = false;
		else checked[item] = true;
		setSelected(checked);
		// console.log(selected);
		for (const catergoryKey of ArrayKey) {
			if (checked[catergoryKey]) checkedKeyArray.push(catergoryKey);
		}
		// console.log(checkedKeyArray);
		filterItems(checkedKeyArray);
	};

	return (
		<aside className="sideBarContainer">
			<div>
				<h3>Catergory</h3>
			</div>
			<div>
				{catergories.map((item) => {
					return (
						<div className="checkBoxAlign" key={item}>
							<input
								type="checkbox"
								name={item}
								id={item}
								value={item}
								checked={selected[item]}
								onChange={() => {
									checkSelected(item);
								}}
							/>
							<label htmlFor={item}>{item}</label>
						</div>
					);
				})}
			</div>
		</aside>
	);
}
