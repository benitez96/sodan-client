import { cart_types } from "../types/types";

const SHIPPING_OFFER = 10_000
const SHIPPING_PRICE = 850


let initialState = {
	items: [],
	shipping: SHIPPING_PRICE,
	total: 0,
	is_open: false
}

const stored_cart = localStorage.getItem('cart')
if (!!stored_cart) {
	initialState = JSON.parse(stored_cart)
}



let total_products = 0
let shipping = SHIPPING_PRICE

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case cart_types.add:

			action.payload.internal_id = `${action.payload.id}-${action.payload.size}`

			const in_cart = state.items.some(item => item.internal_id == action.payload.internal_id)

			if (in_cart) {
				const i = state.items.map(i => i.internal_id).indexOf(action.payload.internal_id)
				const current_qty = state.items.at(i).quantity
				state.items.at(i).quantity = Math.min(current_qty + 1, action.payload.sizes[action.payload.size])
			}

			total_products = [...state.items, action.payload].reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
			shipping = total_products > SHIPPING_OFFER ? 0 : SHIPPING_PRICE

			localStorage.setItem('cart', JSON.stringify(
				{
					...state,
					items: in_cart ? [...state.items] : [...state.items, action.payload],
					shipping,
					total: total_products + shipping,
				}
			))

			return {
				...state,
				items: in_cart ? [...state.items] : [...state.items, action.payload],
				shipping,
				total: total_products + shipping,
			}

		case cart_types.remove:

			total_products = state.items
				.filter(p => p.internal_id !== action.payload.internal_id)
				.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

			shipping = total_products > SHIPPING_OFFER ? 0 : SHIPPING_PRICE


			localStorage.setItem('cart', JSON.stringify(
				{
					...state,
					items: state.items.filter(p => p.internal_id !== action.payload.internal_id),
					shipping,
					total: total_products + shipping,
				}
			))

			return {
				...state,
				items: state.items.filter(p => p.internal_id !== action.payload.internal_id),
				shipping,
				total: total_products + shipping,
			}

		case cart_types.toggle:
			return { ...state, is_open: !state.is_open }

		case cart_types.modify_qty:

			const { quantity, internal_id } = action.payload

			const items = state.items.map(i => {
				if (i.internal_id == internal_id) {
					return { ...i, quantity: i.quantity + quantity }
				}
				return i
			})

			total_products = state.items
				.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

			shipping = total_products > SHIPPING_OFFER ? 0 : SHIPPING_PRICE

			localStorage.setItem('cart', JSON.stringify(
				{
					...state,
					items,
					shipping,
					total: total_products + shipping,
				}
			))


			return {
				...state,
				items,
				shipping,
				total: total_products + shipping,
			}


		case cart_types.clean:
			localStorage.removeItem('cart')
			return {
				items: [],
				shipping: SHIPPING_PRICE,
				total: 0,
				is_open: false
			}


		default:
			return state
	}

}
