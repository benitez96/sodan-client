import axios from "axios"
import { product_types } from "../types/types"


export const load_products = () => {

	return async (dispatch) => {
		const products = await axios.get('http://localhost:8000/api/v1/products/').then(res => res.data)
		dispatch({ type: product_types.load, payload: products })

	}
}


export const get_product_by_slug = (slug) => {

	return async (dispatch) => {
		const product = await axios.get(`http://localhost:8000/api/v1/products/${slug}`).then(res => res.data)
		dispatch({ type: product_types.load_active, payload: product })

	}
}
