import { useState } from 'react'
import './App.css'

const sendFormData = (formData) => {
  console.log(formData)
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setrepeatPassword] = useState('')

  const [newError, setNewError] = useState(null)

  let error = null

  const onEmailChange = ({ target }) => {
    setEmail(target.value)
  }
  const onPasswordChange = ({ target }) => setPassword(target.value)
  const onRepeatPasswordChange = ({ target }) => setrepeatPassword(target.value)

  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!/\S+@\w+\W\w{2,6}/gm.test(email)) {
      error =
        'Ошибка. Введенный адрес почтового ящика не полный (дополните: .ru, .com и т.д)'
    } else if (!/^[0-9A-Za-z_]+$/gm.test(password)) {
      error =
        'Ошибка. Пароль может содержать только латинские буквы, цифры и нижнее подчеркивание'
    } else if (password !== repeatPassword) {
      error = 'Ошибка. Пароли не совпадают'
    } else if (password.length < 8) {
      error = 'Ошибка. В пароле должно быть не менее 8 символов'
    } else {
      sendFormData({ email, password, repeatPassword })
    }

    setNewError(error)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit}>
          <label>Почта</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={onEmailChange}
          />
          <label>Пароль</label>
          <div className="test">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              required
              onChange={onPasswordChange}
            />
            <button type="button" className="showPass" onClick={togglePassword}>
              {showPassword ? 'Скрыть ' : 'Показать '}пароль
            </button>
          </div>

          <label>Повтор пароля</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="repeatPassword"
            value={repeatPassword}
            required
            onChange={onRepeatPasswordChange}
          />
          <button
            type="submit"
            disabled={
              email.length > 0 &&
              password.length > 0 &&
              repeatPassword.length > 0
                ? false
                : true
            }
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      {newError && <div className="errorLabel">{newError}</div>}
    </>
  )
}

export default App
