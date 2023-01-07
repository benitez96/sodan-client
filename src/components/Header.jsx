import { Link } from "react-router-dom"
import { CartButton } from "./CartButton"
import logo from '../assets/logo.jpeg'

export const Header = () => {
	return (
		<header
			className="w-full sticky top-0 z-10 bg-white text-xl font-bold flex justify-center items-center p-3"
		>
			<Link to='/'><img src={logo} className='h-16'/><h1 className="hidden">SODAN</h1></Link>

			<CartButton />

		</header>
	)
}
