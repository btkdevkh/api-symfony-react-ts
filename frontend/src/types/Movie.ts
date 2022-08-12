export type Movie = {
  id?: number
  title: string,
  director: string,
  releaseDate?: string | null,
  isFavorite: boolean
}

export type LayoutProps =  { 
  children: React.ReactNode
}

export type ModalPropType = {
  movie: {
    id: number
    title: string
  },
  handleDelete: Function,
}

export type MovieCardPropType = {
  movie: {
    id: number
    title: string,
    director: string,
    isFavorite: boolean,
  },
  handleDelete: Function,
  toggleIsFavorite: Function
}

export type Data = {
  title: string,
  director: string,
  releaseDate?: string,
}
