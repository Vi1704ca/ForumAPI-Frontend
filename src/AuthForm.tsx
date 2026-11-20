import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation, useRegisterMutation } from './api/baseApi'

type AuthFormData = {
  name: string
  email: string
  password: string
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = error.data
    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      return data.message
    }
  }

  return 'Не вдалося виконати запит. Спробуйте ще раз.'
}

function AuthForm() {
  const [isRegister, setIsRegister] = useState(true)
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation()
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>()

  const onSubmit = async (formData: AuthFormData) => {
    if (isRegister) {
      const result = await registerUser(formData)
      if (result.data) {
        alert('Реєстрація успішна!')
        reset()
      } else if ('error' in result) {
        alert(`Помилка реєстрації: ${getErrorMessage(result.error)}`)
      }
      return
    }

    const result = await loginUser({
      email: formData.email,
      password: formData.password,
    })
    if (result.data) {
      alert('Вхід успішний!')
      reset()
    } else if ('error' in result) {
      alert(`Помилка входу: ${getErrorMessage(result.error)}`)
    }
  }

  const isSubmitting = isRegistering || isLoggingIn

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-tabs" role="tablist" aria-label="Обліковий запис">
        <button
          className={isRegister ? 'auth-tab active' : 'auth-tab'}
          type="button"
          role="tab"
          aria-selected={isRegister}
          onClick={() => {
            setIsRegister(true)
            reset()
          }}
        >
          Реєстрація
        </button>
        <button
          className={!isRegister ? 'auth-tab active' : 'auth-tab'}
          type="button"
          role="tab"
          aria-selected={!isRegister}
          onClick={() => {
            setIsRegister(false)
            reset()
          }}
        >
          Вхід
        </button>
      </div>

      <div className="auth-content">
        <p className="eyebrow">{isRegister ? 'НОВИЙ АКАУНТ' : 'З РАДІСТЮ БАЧИМО'}</p>
        <h2 id="auth-title">{isRegister ? 'Створити акаунт' : 'Увійти на форум'}</h2>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <label className="form-field">
              <span>Ім'я</span>
              <input
                autoComplete="name"
                placeholder="Ваше ім'я"
                {...register('name', {
                  required: 'Вкажіть ім’я.',
                  minLength: { value: 2, message: 'Мінімум 2 символи.' },
                })}
              />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </label>
          )}

          <label className="form-field">
            <span>Електронна пошта</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              {...register('email', {
                required: 'Вкажіть електронну пошту.',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Введіть коректну електронну пошту.',
                },
              })}
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </label>

          <label className="form-field">
            <span>Пароль</span>
            <input
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              placeholder="Введіть пароль"
              {...register('password', {
                required: 'Вкажіть пароль.',
                minLength: { value: 6, message: 'Мінімум 6 символів.' },
              })}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </label>

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Зачекайте...'
              : isRegister
                ? 'Зареєструватися'
                : 'Увійти'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AuthForm
