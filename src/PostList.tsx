import type { Post as PostData } from './data/Post.types'
import Post from './Post'

type PostListProps = {
  posts: PostData[]
}

function PostList({ posts }: PostListProps) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
