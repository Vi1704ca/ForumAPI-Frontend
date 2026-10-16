import Header from './Header'
import PostList from './PostList'
import { posts } from './data/posts'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="welcome">
          <p className="eyebrow">СПІЛЬНОТА</p>
          <h1>Обговорюємо те, що цікаво</h1>
          <p className="welcome-text">
            Ділись думками, став запитання та знаходь корисні відповіді.
          </p>
        </section>

        <section className="feed" aria-labelledby="feed-title">
          <div className="feed-heading">
            <div>
              <p className="eyebrow">ОСТАННІ ОБГОВОРЕННЯ</p>
              <h2 id="feed-title">Стрічка постів</h2>
            </div>
            <span className="post-count">{posts.length} постів</span>
          </div>
          <PostList posts={posts} />
        </section>
      </main>
    </>
  )
}

export default App
