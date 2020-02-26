import { IShopCollectionItem } from './types'

export const addItemToCart = (
  cartItems: Array<IShopCollectionItem>,
  cartItemToAdd: IShopCollectionItem
): Array<IShopCollectionItem> => {
  const isExist = !!cartItems.find(item => item.id === cartItemToAdd.id)
  if (isExist) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity + 1 : 1
          }
        : cartItem
    )
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems: Array<IShopCollectionItem>, id: number) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === id)
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== id)
  }
  return cartItems.map(cartItem =>
    cartItem.id === id && cartItem.quantity
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
