import type { Post as PostData } from './types/Post.types'

type PostProps = {
  post: PostData
}

function Post({ post }: PostProps) {
  const categoryName = typeof post.category === 'string' ? post.category : post.category.name
  const authorName = typeof post.author === 'string'
    ? post.author
    : post.author?.email ?? 'Невідомий автор'

  return (
    <article className="post-card">
      <span className="post-category">{categoryName}</span>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="post-meta">
        <span>{authorName}</span>
        {post.createdAt && (
          <time dateTime={post.createdAt}>
            {post.dateLabel ?? post.createdAt}
          </time>
        )}
      </div>
    </article>
  )
}

export default Post
