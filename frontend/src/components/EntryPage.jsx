/* eslint-disable no-constant-condition */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Form from "./Form";
import logo from '../images/logo.svg'

export default function EntryPage({ name, children, isValid, onSubmit, setIsError }) {
    return (
        <main>
            <section className="login">
                <div className="container container_login">
                    <Link to={'/'} className="login__logo"><img src={logo} alt="" /></Link>
                    <h1 className='login__subtitle'>{name === 'sign-up' ? 'Добро пожаловать!' : 'Рады видеть!'}</h1>
                    <Form
                        name={name}
                        titleButton={name === 'sign-up' ? 'Зарегистрироваться' : 'Войти'}
                        isValid={isValid}
                        setIsError={setIsError}
                        onSubmit={onSubmit}
                    >{children}</Form>
                    {name === 'signup' ?
                        <div className="login__caption">
                            <p className='login__caption-text'>Уже зарегистрированы?</p>
                            <Link to='/signin' className='login__link button'>Войти</Link>
                        </div>
                        :
                        <div className="login__caption">
                            <p className='login__caption-text'>Ещё не зарегистрированы?</p>
                            <Link to='/signup' className='login__link button'>Регистрация</Link>
                        </div>
                    }
                </div>
            </section>
        </main>
    )
}