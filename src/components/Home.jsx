import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { load_products } from "../actions/products"
import { useLastScrollPosition } from "../hooks/useLastScrollPosition"
import { ProductCard } from "./ProductCard"

export const Home = () => {

	useLastScrollPosition('home')
	const dispatch = useDispatch()
	const { products } = useSelector(state => state.products)

	useEffect(() => {
		dispatch(load_products())
	}, [])


	return (
		<div className='w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
			{
				products.map(p => <ProductCard key={p.id} product={p}/>)
			}
		</div>
	)
}
