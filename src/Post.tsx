import type { Post as PostData } from './data/Post.types'

type PostProps = {
  post: PostData
}

function Post({ post }: PostProps) {
  return (
    <article className="post-card">
      <span className="post-category">{post.category}</span>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="post-meta">
        <span>{post.author}</span>
        <time dateTime={post.createdAt}>{post.dateLabel}</time>
      </div>
    </article>
  )
}

export default Post
