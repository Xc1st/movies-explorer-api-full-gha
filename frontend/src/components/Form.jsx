/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import CurrentUserContext from "../contexts/CurrentUserContext"
import SendContext from "../contexts/SendContext"
import ErrorContext from "../contexts/ErrorContext"
import Preloader from "./Preloader/Preloader"

export default function Form({ name, children, titleButton, onSubmit, setIsError, values, isSuccess, setIsSuccess, isEdit, setIsEdit, isValid, exit }) {
    const location = useLocation()
    const isError = useContext(ErrorContext)
    const isSend = useContext(SendContext)
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        setIsError(false)
    }, [setIsError])

    useEffect(() => {
        if (location.pathname === '/profile') {
            setIsSuccess(false)
            setIsEdit(false)
        }
    }, [setIsSuccess, setIsEdit, location.pathname])
    return (
        <form onSubmit={onSubmit} className="form">
            <div>{children}</div>
            {name === 'signin' ?
                <>
                    <span className={`login__error login__error_button ${isError ? 'error' : ''}`}>{isError ? 'При входе произошла ошибка.' : ''}</span>
                    <button
                        type="submit"
                        className={`login__button ${isValid && !isError ? '' : 'login__button_disabled'}`}
                        disabled={!isValid || isSend || isError}
                    >{isSend ? <Preloader name={'button'} /> : titleButton}</button>
                </>
                :
                name === 'signup' ?
                    <>
                        <span className={`login__error login__error_button ${isError ? 'error' : ''}`}>{isError ? 'При регистрации произошла ошибка.' : ''}</span>
                        <button
                            type="submit"
                            className={`login__button ${isValid && !isError ? '' : 'login__button_disabled'}`}
                            disabled={!isValid || isSend || isError}
                        >{isSend ? <Preloader name={'button'} /> : titleButton}</button>
                    </>
                    :
                    <>
                        {isEdit ?

                            <>

                                <button className={`profile__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'profile__submit_disabled' : ''}`} type="submit" disabled={!isValid || isSend || isError}>
                                    {isSend ? <Preloader name={'button'} /> : titleButton}
                                </button>
                            </>
                            :
                            <>
                                <span className={`profile__error error ${isError ? 'error' : isSuccess && 'profile__error_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
                                <button type="button" className="profile__edit button" onClick={() => setIsEdit(true)}>Редактировать</button>
                                <Link to="/" className="profile__exit button" onClick={exit}>Выйти из аккаунта</Link>
                            </>}
                    </>
            }
        </form >
    )
}