import { Cart } from "./Cart"
import { Header } from "./Header"


export const Layout = ({ children }) => {
	return (
		<main>
			<Header />
			<Cart />
			<div className="container mx-auto">
				{children}
			</div>
			<footer className="text-gray-500 text-center p-3 text-xs">SODAN 2023</footer>
		</main>
	)
}
