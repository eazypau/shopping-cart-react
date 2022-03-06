import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import Cart from "./pages/Cart";
import PurchaseHistory from "./pages/PurchaseHistory";

function App() {
	return (
		<Router>
			<div className="App">
				<NavigationBar />
				<Switch>
					{/* home page must always be placed at the bottom, because it matches the string it contains */}
					{/* it doesnt go exact match by default, to avoid this, need to add exact in the Route */}
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/cart">
						<Cart />
					</Route>
					<Route path="/purchase">
						<PurchaseHistory />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
