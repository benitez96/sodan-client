import { BiShoppingBag } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { toggle_cart } from "../actions/cart"

export const CartButton = () => {


	const dispatch = useDispatch()
	const { items } = useSelector(state => state.cart)


	return (
		<button className="absolute top-4 right-6" onClick={() => dispatch(toggle_cart())}>
			<span className="relative text-xl">
				<BiShoppingBag />
				<small
					className='bg-black text-white text-[0.6rem] absolute rounded-full h-4 w-4 grid content-center top-3 right-2'
				>
					{items.length}
				</small>
			</span>
		</button>
	)
}
