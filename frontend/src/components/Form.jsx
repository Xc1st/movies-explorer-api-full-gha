/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import CurrentUserContext from "../contexts/CurrentUserContext"
import SendContext from "../contexts/SendContext"
import ErrorContext from "../contexts/ErrorContext"

export default function Form({ name, children, titleButton, onSubmit, setIsError, values, isSuccess, setIsSuccess, isEdit, setIsEdit, isValid }) {
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
                    >{titleButton}</button>
                </>
                :
                name === 'signup' ?
                    <>
                        <span className={`login__error login__error_button ${isError ? 'error' : ''}`}>{isError ? 'При регистрации произошла ошибка.' : ''}</span>
                        <button
                            type="submit"
                            className={`login__button ${isValid && !isError ? '' : 'login__button_disabled'}`}
                            disabled={!isValid || isSend || isError}
                        >{titleButton}</button>
                    </>
                    :
                    <>
                        <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request'}`}></span>
                        <button
                            type="submit"
                            className='login__save'
                        >{titleButton}</button>
                    </>
            }
        </form >
    )
}