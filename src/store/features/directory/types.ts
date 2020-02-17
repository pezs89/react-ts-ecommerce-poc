export interface IMenuItem {
  id: number
  title: string
  imageUrl: string
  linkUrl: string
  size?: string
}

export interface IShopItems {
  id: number
  title: string
  routeName: string
  items: Array<IShopItem>
}

export interface IShopItem {
  id: number
  name: string
  price: number
  imageUrl?: string
}
