import type { Post as PostData } from './types/Post.types'

type PostProps = {
  post: PostData
}

function Post({ post }: PostProps) {
  return (
    <article className="post-card">
      <span className="post-category">{post.category.name}</span>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="post-meta">
        <span>{post.author}</span>
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
