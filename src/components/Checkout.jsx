import { useSelector } from "react-redux"
import CartItem from "./CartItem"

import logo from '../assets/logo.jpeg'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Field, Formik, replace } from "formik"
import * as Yup from 'yup';
import axios from "axios"
import DotsLoader from "./DotsLoader"

export const Checkout = () => {

	const { cart } = useSelector(state => state)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		if (!cart.items.length) {
			navigate('/')
		}
	}, [cart])


	const shippingForm = {
		items: cart.items.map(i => ({ ...i, product_name: i.name, product: i.id })),
		total_amount: cart.total,
		name: '',
		lastname: '',
		dni: '',
		phone: '',
		email: '',
		street: '',
		street_number: '',
		neighborhood: '',
		city: '',
		state: '',
		zip_code: '',
		shipping_cost: cart.shipping
	}

	const validateSchema = Yup.object().shape({
		name: Yup.string().required('Este campo es requerido'),
		lastname: Yup.string().required('Este campo es requerido'),
		dni: Yup.string().required('Este campo es requerido'),
		phone: Yup.string().required('Este campo es requerido'),
		email: Yup.string().email('Correo invalido').required('Este campo es requerido'),
		street: Yup.string().required('Este campo es requerido'),
		city: Yup.string().required('Este campo es requerido'),
		// state: Yup.string().required('Este campo es requerido'),
		zip_code: Yup.string().required('Este campo es requerido'),

	})

	const handleSubmit = (values) => {
		setLoading(true)
		axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders/`, values)
			.then(res => {
				localStorage.removeItem('cart')
				setLoading(false)
				window.location.replace(res.data)
			})
			.catch(_ => {
				setError(true)
				setLoading(false)
			})
	}


	return (
		<section>
			<h1 className="sr-only">Checkout</h1>

			<div className="grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2">
				<div className="py-12 bg-gray-50 md:py-24">
					<div className="max-w-lg px-4 mx-auto space-y-8 lg:px-8">
						<Link to='/' className="flex items-center justify-center">
							<img src={logo} className='h-20' />
						</Link>

						<div>
							<p className="text-2xl font-medium tracking-tight text-gray-900">
								${cart.total}
							</p>

							<p className="mt-1 text-sm text-gray-600">Por la compra de</p>
						</div>

						<div>
							<div className="flow-root">
								<ul className="-my-4 divide-y divide-gray-100">
									{
										cart.items.map(item => <CartItem product={item} key={item.internal_id} />)
									}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="py-6 bg-white md:py-12">
					<div className="max-w-lg px-4 mx-auto lg:px-8">
						<Formik
							initialValues={shippingForm}
							validationSchema={validateSchema}
							onSubmit={handleSubmit}
						>
							{
								props =>
									<form className="grid grid-cols-6 gap-2" onSubmit={props.handleSubmit}>
										<legend className="col-span-6">Datos de envio</legend>
										<div className="col-span-3">
											<label
												htmlFor="name"
												className="text-xs font-medium text-gray-700"
											>
												Nombre
											</label>
											<Field
												name="name"
												className={`${props.errors.name && props.touched.name ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.name && props.touched.name
												&&
												<div className="text-xs text-red-700">{props.errors.name}</div>
											}

										</div>

										<div className="col-span-3">
											<label
												htmlFor="lastname"
												className="text-xs font-medium text-gray-700"
											>
												Apellido
											</label>

											<Field
												name="lastname"
												className={`${props.errors.lastname && props.touched.lastname ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.lastname && props.touched.lastname
												&&
												<div className="text-xs text-red-700">{props.errors.lastname}</div>
											}
										</div>

										<div className="col-span-6">
											<label
												htmlFor="dni"
												className="text-xs font-medium text-gray-700"
											>
												DNI o CUIL
											</label>

											<Field
												name="dni"
												className={`${props.errors.dni && props.touched.dni ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.dni && props.touched.dni
												&&
												<div className="text-xs text-red-700">{props.errors.dni}</div>
											}
										</div>

										<div className="col-span-6">
											<label htmlFor="email" className="block text-xs font-medium text-gray-700">
												Email
											</label>

											<Field
												name="email"
												className={`${props.errors.email && props.touched.email ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.email && props.touched.email
												&&
												<div className="text-xs text-red-700">{props.errors.email}</div>
											}
										</div>

										<div className="col-span-6">
											<label htmlFor="phone" className="block text-xs font-medium text-gray-700">
												Telefono
											</label>

											<Field
												name="phone"
												className={`${props.errors.phone && props.touched.phone ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.phone && props.touched.phone
												&&
												<div className="text-xs text-red-700">{props.errors.phone}</div>
											}
										</div>
										<div className="col-span-3">
											<label htmlFor="street" className="block text-xs font-medium text-gray-700">
												Calle
											</label>

											<Field
												name="street"
												className={`${props.errors.street && props.touched.street ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.street && props.touched.street
												&&
												<div className="text-xs text-red-700">{props.errors.street}</div>
											}
										</div>
										<div className="col-span-3">
											<label htmlFor="street_number" className="block text-xs font-medium text-gray-700">
												Numero (opcional)
											</label>

											<Field
												name="street_number"
												className={`${props.errors.street_number && props.touched.street_number ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.street_number && props.touched.street_number
												&&
												<div className="text-xs text-red-700">{props.errors.street_number}</div>
											}
										</div>
										<div className="col-span-3">
											<label htmlFor="neighborhood" className="block text-xs font-medium text-gray-700">
												Barrio (opcional)
											</label>

											<Field
												name="neighborhood"
												className={`${props.errors.neighborhood && props.touched.neighborhood ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.neighborhood && props.touched.neighborhood
												&&
												<div className="text-xs text-red-700">{props.errors.neighborhood}</div>
											}
										</div>

										<div className="col-span-3">

											<label htmlFor="city" className="block text-xs font-medium text-gray-700">
												Ciudad
											</label>

											<Field
												name="city"
												className={`${props.errors.city && props.touched.city ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.city && props.touched.city
												&&
												<div className="text-xs text-red-700">{props.errors.city}</div>
											}
										</div>

										<div className="col-span-3">
											<label htmlFor="zip_code" className="block text-xs font-medium text-gray-700">
												Codigo Postal
											</label>

											<Field
												name="zip_code"
												className={`${props.errors.zip_code && props.touched.zip_code ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.zip_code && props.touched.zip_code
												&&
												<div className="text-xs text-red-700">{props.errors.zip_code}</div>
											}
										</div>

										<div className="col-span-3">
											<label htmlFor="state" className="block text-xs font-medium text-gray-700">
												Provincia
											</label>

											<Field
												name="state"
												className={`${props.errors.state && props.touched.state ? 'border-red-700' : 'border-gray-200'} w-full mt-1 rounded-md shadow-sm sm:text-sm p-2 border`}
											/>
											{
												props.errors.state && props.touched.state
												&&
												<div className="text-xs text-red-700">{props.errors.state}</div>
											}
										</div>

										<div className="col-span-6">
											<button
												className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
												type="submit"
											>
												{
													loading ? <DotsLoader /> : 'Pagar'
												}
											</button>
											{
												error && <div className="text-red-700 text-center">Ha ocurrido un error. Por favor, intente mas tarde.</div>
											}
										</div>

									</form>
							}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	)
}
