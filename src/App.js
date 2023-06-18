import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const emailError = errors.email?.message
  const passwordError = errors.password?.message

  const emailProps = {
    pattern: {
      value: /\S+@\w+\W\w{2,6}/,
      message:
        'Ошибка. Введенный адрес почтового ящика не полный (дополните: .ru, .com и т.д)',
    },
  }

  const passwordProps = {
    minLength: {
      value: 8,
      message: 'Ошибка. В пароле должно быть не менее 8 символов',
    },
    pattern: {
      value: /^[0-9A-Za-z_]+$/,
      message:
        'Ошибка. Пароль может содержать только латинские буквы, цифры и нижнее подчеркивание',
    },
  }

  const onSubmit = (formData) => {
    console.log(formData)
  }

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Почта</label>
          <input
            type="email"
            name="email"
            required
            {...register('email', emailProps)}
          />
          <label>Пароль</label>
          <div className="password">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              {...register('password', passwordProps)}
            />
            <button type="button" className="showPass" onClick={togglePassword}>
              {showPassword ? 'Скрыть ' : 'Показать '}пароль
            </button>
          </div>

          <label>Повтор пароля</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="repeatPassword"
            required
            {...register('repeatPassword', passwordProps)}
          />
          <button type="submit" disabled={!!emailError || !!passwordError}>
            Зарегистрироваться
          </button>
        </form>
      </div>
      {emailError && <div className="errorLabel">{emailError}</div>}
      {passwordError && <div className="errorLabel">{passwordError}</div>}
    </>
  )
}

export default App
