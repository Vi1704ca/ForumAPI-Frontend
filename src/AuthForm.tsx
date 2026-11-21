import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function AuthForm() {
  const [isRegister, setIsRegister] = useState(true)

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-tabs" role="tablist" aria-label="Обліковий запис">
        <button
          className={isRegister ? 'auth-tab active' : 'auth-tab'}
          type="button"
          role="tab"
          aria-selected={isRegister}
          onClick={() => setIsRegister(true)}
        >
          Реєстрація
        </button>
        <button
          className={!isRegister ? 'auth-tab active' : 'auth-tab'}
          type="button"
          role="tab"
          aria-selected={!isRegister}
          onClick={() => setIsRegister(false)}
        >
          Вхід
        </button>
      </div>

      <div className="auth-content">
        <p className="eyebrow">{isRegister ? 'НОВИЙ АКАУНТ' : 'З РАДІСТЮ БАЧИМО'}</p>
        <h2 id="auth-title">{isRegister ? 'Створити акаунт' : 'Увійти на форум'}</h2>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </section>
  )
}

export default AuthForm
