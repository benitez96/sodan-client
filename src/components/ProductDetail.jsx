import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { add_to_cart } from "../actions/cart"
import { get_product_by_slug } from "../actions/products"

export const ProductDetail = () => {

	const params = useParams()
	const { slug } = params
	const dispatch = useDispatch()

	const [size, setSize] = useState()

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


	if (!product)
		return <p>loading..</p>


	return (
		<section>
			<div className="relative mx-auto max-w-screen-xl px-4 py-8">
				<div className="grid gap-8 lg:grid-cols-4 lg:items-start">
					<div className="lg:col-span-3">
						<div className="relative mt-4">
							<img
								alt={product.name}
								src={`${import.meta.env.VITE_IMAGES_SERVER_URL}/${product.images[0]}`}
								className="h-72 w-full rounded-xl object-contain lg:h-[540px]"
							/>
						</div>

						<ul className="mt-1 flex gap-1">
							{
								product.images.map((image, i) =>
									i !== 0
									&&
									<li>
										<img
											key={image}
											alt={product.name}
											src={`${import.meta.env.VITE_IMAGES_SERVER_URL}/${image}`}
											className="h-16 w-16 rounded-md object-cover"
										/>
									</li>
								)
							}
						</ul>
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
														className={`uppercase text-sm p-1 ${size == k ? 'bg-teal-600' : ''} px-3 rounded-md border text-gray-700 border-gray-400`}
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
								<p className="text-2xl">${product.price}</p>
							</div>

							<button
								onClick={handleAddToCart}
								className="w-full rounded bg-purple-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
							>
								Agregar al carrito
							</button>

						</div>
					</div>

					<div className="lg:col-span-3">
						<div
							className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl"
						>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ad
								labore nostrum, a explicabo iste est dolorem deserunt id ullam magni
								accusamus saepe, nulla sed sint reiciendis, aperiam cumque officiis!
							</p>

							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
								eveniet ipsam mollitia nesciunt illo! Suscipit, corrupti!
							</p>

						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
