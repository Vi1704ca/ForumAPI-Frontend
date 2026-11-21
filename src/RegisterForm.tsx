import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from './api/baseApi'

type RegisterFormData = {
  name: string
  email: string
  password: string
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const apiError = error as FetchBaseQueryError
    if (apiError.status === 409) return 'Ця електронна пошта вже зайнята.'
    if (apiError.status === 'FETCH_ERROR') return 'Сервер недоступний. Перевірте мережу та спробуйте ще раз.'
  }

  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = (error as { data?: { message?: unknown } }).data
    if (typeof data?.message === 'string') return data.message
  }

  return 'Не вдалося зареєструватися. Спробуйте ще раз.'
}

function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onChange' })

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      await registerUser({ email: formData.email, password: formData.password }).unwrap()
      reset()
    } catch (error) {
      setError('root', { message: getErrorMessage(error) })
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          autoComplete="new-password"
          placeholder="Введіть пароль"
          {...register('password', {
            required: 'Вкажіть пароль.',
            minLength: { value: 8, message: 'Мінімум 8 символів.' },
          })}
        />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </label>

      {errors.root && <p className="form-error" role="alert">{errors.root.message}</p>}

      <button className="auth-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Зачекайте...' : 'Зареєструватися'}
      </button>
    </form>
  )
}

export default RegisterForm
