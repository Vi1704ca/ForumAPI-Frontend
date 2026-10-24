export type Category = {
  id: number
  name: string
}

export type Post = {
  id: number
  title: string
  content: string
  author: string
  category: Category
  createdAt?: string
  dateLabel?: string
}
