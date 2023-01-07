import { cart_types } from "../types/types"


export const toggle_cart = () => ({ type: cart_types.toggle })

export const add_to_cart = (payload) => ({ type: cart_types.add, payload })

export const remove_from_cart = (internal_id) => ({ type: cart_types.remove, payload: {internal_id} })

export const modify_quantity = (payload) => ({ type: cart_types.modify_qty, payload })
