import { Cart } from "./Cart"
import { Header } from "./Header"
import { AiOutlineInstagram } from 'react-icons/ai'


export const Layout = ({ children }) => {
	return (
		<main>
			<Header />
			<Cart />
			<div className="container mx-auto">
				{children}
			</div>
			<footer className="text-gray-500 flex flex-col items-center justify-center gap-2 p-3 text-xs">
				<a href="https://www.instagram.com/SODAN_CLOTHES" target='_blank' className='text-2xl flex items-center gap-1'><AiOutlineInstagram /><div className="text-lg">SODAN_CLOTHES</div></a>
				<span>SODAN 2023 ©</span>
			</footer>
		</main>
	)
}
