import { useSelector } from "react-redux";
import {
	createBrowserRouter,
} from "react-router-dom";

import App from "./App";
import { Checkout } from "./components/Checkout";
import { Home } from "./components/Home";
import { ProductDetail } from "./components/ProductDetail";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children:[
			{
				path: '/',
				element: <Home/>
			},
			{
				path: '/products/:slug',
				element: <ProductDetail />
			},
		]
	},
	{
		path: '/checkout',
		element: <Checkout />
		
	}
]);
