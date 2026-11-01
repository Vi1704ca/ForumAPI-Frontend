export type Category = {
  id: number
  name: string
}

export type Post = {
  id: number
  title: string
  content: string
  author: {
    id: number
    email: string
  } | null
  category: Category
  createdAt?: string
  dateLabel?: string
}
