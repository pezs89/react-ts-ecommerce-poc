import { IShopItem } from '../store/features/cart/types'

export const stopPropagation = (event: React.MouseEvent): void => {
  event.stopPropagation()
}

export const addItemToCart = (
  cartItems: Array<IShopItem>,
  cartItemToAdd: IShopItem
) => {
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
