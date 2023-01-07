import { product_types } from "../types/types";


const initialState = {
	products: [],
	active: null
}

export const productsReducer = (state = initialState, action) => {

	switch (action.type) {
		case product_types.load:
			return { products: [...action.payload] }

		case product_types.load_active:
			return {
				...state,
				active: action.payload
			}

		default:
			return state
	}

}
