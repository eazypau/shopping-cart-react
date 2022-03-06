import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import { initialProductList } from "../data/products";
import MesageModal from "../components/MessageModal";

export default function Home() {
	const shopItems = initialProductList;

	const [filteredItems, setFilteredItems] = useState(shopItems);
	const [modalContent, setModalContent] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showMessageModal, setShowMessageModal] = useState(false);

	const filterByCatergories = (catergories) => {
		// console.log("filtering", catergories);
		let newFilteredList;
		if (catergories.length === 0) {
			console.log("triggered.....?");
			setFilteredItems(shopItems);
		} else {
			newFilteredList = shopItems.filter((item) => {
				return catergories.includes(item.catergory);
			});
			setFilteredItems(newFilteredList);
		}
	};

	const selectedProduct = (id) => {
		if (shopItems[id - 1].quantity === 0) {
			return;
		}
		console.log("selected");
		setModalContent(shopItems[id - 1]);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setModalContent({});
	};

	const openAndCloseMessageModal = () => {
		setShowMessageModal(true)
		setTimeout(() => {
			setShowMessageModal(false)
		}, 1200);
	}

	return (
		<div className="homeLayoutContainer">
			{showMessageModal ? <MesageModal text={"Added into cart"} /> : ""}
			{showModal ? <Modal props={modalContent} closeModal={closeModal} openAndCloseMessageModal={openAndCloseMessageModal} /> : ""}
			<SideBar filterItems={filterByCatergories} />
			<div className="productGrid">
				{filteredItems.map((item) => {
					// console.log(item);
					return <ProductCard key={item.id} props={item} selectItem={selectedProduct} />;
				})}
			</div>
		</div>
	);
}
