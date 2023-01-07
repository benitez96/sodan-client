
import {
	Link
} from 'react-router-dom'

export const ProductCard = ({ product }) => {

	return (
		<Link to={`products/${product.slug}`} >
			<img
				src={`http://localhost:8000${product.main_image}`}
				alt={product.name}
				className="object-cover w-full rounded aspect-square"
			/>

			<div className="m-3 text-xl">
				<h3
					className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
				>
					{product.name}
				</h3>

				<p className="mt-1 text-gray-700">${product.price}</p>
				{
					product.sizes
					&&
					(
						<section className='text-gray-500'>
							<p className='text-sm'>Talles disponibles</p>
							<div className='flex gap-3 p-1'>
								{
									Object.entries(product.sizes).map(([k, v]) => v > 0 && <p key={k} className='text-xs'>{k.toUpperCase()}</p>)
								}
							</div>
						</section>
					)
				}
			</div>
		</Link>
	)
}

