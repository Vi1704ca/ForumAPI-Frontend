import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from './api/baseApi'

type LoginFormData = {
  email: string
  password: string
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const apiError = error as FetchBaseQueryError
    if (apiError.status === 401) return 'Неправильна електронна пошта або пароль.'
    if (apiError.status === 'FETCH_ERROR') return 'Сервер недоступний. Перевірте мережу та спробуйте ще раз.'
  }

  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = (error as { data?: { message?: unknown } }).data
    if (typeof data?.message === 'string') return data.message
  }

  return 'Не вдалося увійти. Спробуйте ще раз.'
}

function LoginForm() {
  const [loginUser, { isLoading }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onChange' })

  const onSubmit = async (formData: LoginFormData) => {
    try {
      await loginUser(formData).unwrap()
      reset()
    } catch (error) {
      setError('root', { message: getErrorMessage(error) })
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          autoComplete="current-password"
          placeholder="Введіть пароль"
          {...register('password', {
            required: 'Вкажіть пароль.',
            minLength: { value: 6, message: 'Мінімум 6 символів.' },
          })}
        />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </label>

      {errors.root && <p className="form-error" role="alert">{errors.root.message}</p>}

      <button className="auth-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Зачекайте...' : 'Увійти'}
      </button>
    </form>
  )
}

export default LoginForm
