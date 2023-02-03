import { Link } from "react-router-dom"
import { CartButton } from "./CartButton"
import logo from '../assets/sodan.svg'
import { Announcement } from "./Announcement"
import { useEffect, useState } from 'react';

export const Header = () => {

	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const onScroll = _ => setOffset(window.pageYOffset);
		window.addEventListener('scroll', onScroll, { passive: true });

		// clean up code
		return () => window.removeEventListener('scroll', onScroll);
	}, [setOffset]);

	return (

		<>
			<Announcement />
			<header
				className={`w-full sticky ${offset > 360 ? '-translate-y-7' : ''} transition duration-500 top-7 z-10 bg-white text-xl font-bold flex justify-center items-center p-3`}
			>

				<Link to='/'><img src={logo} alt='sodan_logo' className='h-16' /><h1 className="hidden">SODAN</h1></Link>

				<CartButton />
			</header>
		</>
	)
}
