import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toggle_cart } from "../actions/cart"
import CartItem from "./CartItem"

export const Cart = () => {

	const dispatch = useDispatch()
	const { is_open, items, total, shipping } = useSelector(state => state.cart)

	const navigate = useNavigate()

	const handleCheckout = () => {
		navigate('/checkout')
	}

	return (

		<aside className={`${is_open ? 'flex' : 'hidden'} items-center justify-end w-full h-screen z-10 fixed top-0`}>

			<div
				onClick={() => dispatch(toggle_cart())}
				className="bg-black opacity-30 h-full w-full absolute"
			>
			</div>

			<div className="w-screen h-screen md:w-[28rem] md:h-[98%] bg-white relative md:m-2 md:rounded-md flex flex-col justify-between">
				<div className="h-32 border-b-2 border-gray-300 flex items-end">
					<span
						className="m-3 text-2xl"
					>
						Carrito de compras
					</span>
				</div>
				<div className="h-full overflow-y-auto p-3">
					<div className=" flex flex-col gap-2 shrink-0">
						{
							items.map(item => <CartItem product={item} key={item.internal_id} canRemove />)
						}
					</div>
				</div>
				{
					!!items.length
					&&
					(
						<div
							className="h-40 p-4 border-b-2 mb-2 border-gray-300 flex flex-col justify-evenly text-sm"
						>
							<div className="flex justify-between pr-5">
								<span>Envio:</span><span>{!!shipping ? `$ ${shipping}` : 'GRATIS'}</span>
							</div>
							<div className="flex justify-between pr-5">
								<span>Total:</span><span>$ {total}</span>
							</div>
						</div>
					)
				}
				<div
					className="h-40 flex flex-col justify-evenly"
				>
					<button
						className={`${!items.length ? 'bg-pink-300' : 'bg-pink-500'} hover:bg-pink-400 p-3 mx-5 text-sm font-bold text-white rounded-md text-center`}
						disabled={!items.length}
						onClick={handleCheckout}
					>
						INICIAR COMPRA
					</button>
					<button
						onClick={() => dispatch(toggle_cart())}
						className="p-3 mx-5"
					>
						Seguir comprando
					</button>
				</div>
			</div>

		</aside>
	)
}

