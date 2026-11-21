export type Category = {
  id: number
  name: string
}

export type Post = {
  id: number
  title: string
  content: string
  author:
    | {
        id: number
        email: string
      }
    | string
    | null
  category: Category | string
  createdAt?: string
  dateLabel?: string
}
