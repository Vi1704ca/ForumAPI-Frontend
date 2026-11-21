import Header from './Header'
import PostList from './PostList'
import AuthForm from './AuthForm'
import './App.css'
import { useGetMeQuery, useGetPostsQuery } from './api/baseApi'

function App() {
  const { data: posts, isLoading, isError } = useGetPostsQuery()
  const { data: currentUser } = useGetMeQuery()

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

        {currentUser ? (
          <section className="current-user-card" aria-live="polite">
            <span className="current-user-label">Ви увійшли як</span>
            <strong>{currentUser.email}</strong>
          </section>
        ) : (
          <AuthForm />
        )}

        <section className="feed" aria-labelledby="feed-title">
          <div className="feed-heading">
            <div>
              <p className="eyebrow">ОСТАННІ ОБГОВОРЕННЯ</p>
              <h2 id="feed-title">Стрічка постів</h2>
            </div>
            <span className="post-count">{posts?.length ?? 0} постів</span>
          </div>
          {isLoading && <p>Завантаження...</p>}
          {isError && <p>Не вдалося завантажити пости.</p>}
          {posts && posts.length > 0 && <PostList posts={posts} />}
          {posts?.length === 0 && <p>Пости не знайдено.</p>}
        </section>
      </main>
    </>
  )
}

export default App
