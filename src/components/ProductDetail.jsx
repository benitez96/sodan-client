import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { add_to_cart } from "../actions/cart"
import { get_product_by_slug } from "../actions/products"
import { NotFound } from "./NotFound"
import talles from '../assets/talles.svg'

export const ProductDetail = () => {

	const params = useParams()
	const { slug } = params
	const dispatch = useDispatch()

	const [size, setSize] = useState()
	const [displayImage, setDisplayImage] = useState(0)


	const handleChangeSize = (size) => {
		setSize(size)
	}

	const handleAddToCart = () => {

		const prod = {
			...product,
			size,
			quantity: 1
		}

		dispatch(add_to_cart(prod))

	}

	const { active: product } = useSelector(state => state.products)
	useEffect(() => {
		dispatch(get_product_by_slug(slug))

	}, [dispatch, slug])

	useEffect(() => {

		if (product?.sizes) {
			setSize(Object.entries(product.sizes).filter(([_, v]) => !!v)[0][0])
		}
	}, [product])

	useEffect(() => {
		document.documentElement.scrollTop = 0
	},[])


	if (!product)
		return (
			<section>

				<div className="relative mx-auto max-w-screen-xl px-4 py-8 animate-pulse">
					<div className="grid gap-8 lg:grid-cols-4 lg:items-start">
						<div className="lg:col-span-3">
							<div className="flex items-center justify-center w-full h-72 lg:h-[540px] bg-gray-300 rounded"></div>
						</div>

						<div className="self-center">
							<h1 className="h-12 bg-gray-300"></h1>
							<div className="space-y-4 lg:pt-8">
								<div className="text-2xl h-10 bg-gray-400 w-32 mt-2"></div>

								<div
									className="w-full rounded bg-pink-400 text-white h-12"
								>
								</div>

							</div>
						</div>
					</div>
					<div className="col-span-full">
						<div
							className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl mt-12 flex justify-center items-center"
						>
							<div className="flex items-center justify-center w-full h-72 bg-gray-300 rounded"></div>

						</div>
					</div>
				</div>


			</section>
		)

	if (product == 'not found')
		return <NotFound />


	return (
		<section>
			<div className="relative mx-auto max-w-screen-xl px-4 py-8">
				<div className="grid gap-8 lg:grid-cols-4 lg:items-start">
					<div className="lg:col-span-3">
						<div className="relative mt-4 rounded">
							<img
								alt={product.name}
								src={`${import.meta.env.VITE_IMAGES_SERVER_URL}/${product.images[displayImage]}`}
								className="object-contain w-full rounded lg:h-[540px]"
							/>
						</div>

						{
							product.images.length > 1
							&&
							<ul className="mt-1 flex gap-1">
								{
									product.images.map((image, i) =>
										<li key={image}>
											<img
												alt={product.name}
												src={`${import.meta.env.VITE_IMAGES_SERVER_URL}/${image}`}
												className="h-16 w-16 rounded-md object-cover border border-gray-300 cursor-pointer"
												onClick={() => setDisplayImage(i)}
											/>
										</li>
									)
								}
							</ul>
						}
					</div>

					<div className="self-center">
						<h1 className="font-light text-4xl">{product.name}</h1>
						<div className="space-y-4 lg:pt-8">
							{
								!!product.sizes
								&&
								(
									<div>
										<legend className="text-md font-light">Talles</legend>
										<div className="mt-2 flex gap-2">
											{
												Object.entries(product.sizes).filter(s => !!s[1]).map(([k, v]) =>
													<button
														key={k}
														className={`uppercase text-sm p-1 ${size == k ? 'bg-pink-500' : ''} px-3 rounded-md border text-gray-200 border-gray-300`}
														disabled={!v}
														onClick={() => handleChangeSize(k)}
													>
														{k}
													</button>
												)
											}
										</div>
									</div>
								)
							}
							<div>
								<p className="text-2xl">{product.price.toLocaleString('es-ar', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0})}</p>
							</div>

							<button
								onClick={handleAddToCart}
								className="w-full rounded bg-pink-500 hover:bg-pink-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
							>
								Agregar al carrito
							</button>

						</div>
					</div>

					<div className="col-span-full">
						<div
							className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl mt-12 flex justify-center items-center"
						>
							<img
								src={talles}
								alt="tabla-talles"
								className="rounded-md object-cover"
							/>

						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
