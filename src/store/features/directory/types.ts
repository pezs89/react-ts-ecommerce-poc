export interface DirectoryState {
  sections: IMenuItem[]
}

export interface IMenuItem {
  id: number
  title: string
  imageUrl: string
  linkUrl: string
  size?: string
}
