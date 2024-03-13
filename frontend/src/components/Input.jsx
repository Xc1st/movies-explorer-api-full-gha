/* eslint-disable react/prop-types */
import { useContext } from "react"
import SendContext from "../contexts/SendContext"
import { useLocation } from "react-router-dom"

export default function Input({ name, isInputValid, error, placeholder, minLength, maxLength, value, onChange, type, pattern, disabled }) {
    const isSend = useContext(SendContext)
    const location = useLocation()

    return (
        <>
            {location.pathname === '/signin' &&
                <>
                    <p className="login__input-caption">{name === 'email' ? 'E-mail' : name === 'password' ? 'Пароль' : 'Имя'}</p>
                    <input
                        className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
                        type={type}
                        onChange={onChange}
                        disabled={isSend}
                        value={value || ''}
                        minLength={minLength}
                        maxLength={maxLength}
                        required
                        placeholder={placeholder}
                        pattern={pattern}
                        name={name}
                    />
                    <span className="login__error error">{error}</span>
                </>
            }
            {location.pathname === '/signup' &&
                <>
                    <p className="login__input-caption">{name === 'email' ? 'E-mail' : name === 'password' ? 'Пароль' : 'Имя'}</p>
                    <input
                        className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
                        type={type}
                        onChange={onChange}
                        disabled={isSend}
                        value={value || ''}
                        minLength={minLength}
                        maxLength={maxLength}
                        required
                        placeholder={placeholder}
                        pattern={pattern}
                        name={name}
                    />
                    <span className="login__error error">{error}</span>
                </>
            }
            {location.pathname === '/profile' &&
                <>
                    <input
                        className={`profile__input ${isInputValid === undefined || isInputValid ? '' : 'profile__input_invalid'}`}
                        type={type}
                        value={value || ''}
                        onChange={onChange}
                        disabled={isSend || disabled}
                        minLength={minLength}
                        maxLength={maxLength}
                        required
                        placeholder={placeholder}
                        pattern={pattern}
                        name={name}
                    />
                    <span className="profile__error error">{error}</span>
                </>
            }
            {location.pathname === '/movies' &&
                <>
                    <input
                        value={value || ''}
                        name={name}
                        required
                        type={type}
                        className="search-string__input"
                        placeholder="Фильм"
                        pattern={pattern}
                        onChange={onChange}
                    />
                </>
            }
            {location.pathname === '/saved-movies' &&
                <>
                    <input
                        name={name}
                        value={value || ''}
                        required
                        type={type}
                        className="search-string__input"
                        placeholder="Фильм"
                        pattern={pattern}
                        onChange={onChange}
                        disabled={disabled}
                    />
                </>
            }
        </>
    )
}