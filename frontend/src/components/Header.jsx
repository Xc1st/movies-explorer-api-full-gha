/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from '../images/logo.svg'
import profile from '../images/profile.svg'
import { Link, useLocation } from "react-router-dom";
import backlineFoto from '../images/backline.png'
import cross from '../images/x.png'

export default function Header({ black, loggedIn }) {
    const [isVisible, setIsVisible] = useState(false)
    const location = useLocation()

    function backline() {
        if (isVisible) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }
    return (
        <>
            <header className={`header ${black ? 'header_black' : ''}`}>
                <div className="container container_header">
                    <Link to="/"><img className="header__logo" src={logo} alt="Логотип" /></Link>
                    {loggedIn ?
                        <>
                            <div className="header__films">
                                <Link to="/movies" className={`header__button ${location.pathname === '/movies' ? 'header__button_active' : ''} header__button_type_films `}> Фильмы </Link>
                                <Link to="/saved-movies" className={`header__button ${location.pathname === '/saved-movies' ? 'header__button_active' : ''} header__button_type_saved-films`}> Сохранённые фильмы </Link>
                            </div>
                        </>
                        :
                        <></>}
                    <div className="header__button-container">
                        {loggedIn ?
                            <>
                                <Link to='/profile' className="header__button header__button_type_account account button">
                                    <p className={`header__profile ${black ? 'header__profile_black' : ''}`}>Аккаунт</p>
                                    <img className={`header__profile-pic ${black ? 'header__profile-pic_black' : ''}`} src={profile} alt="Картинка профиля" />
                                </Link>
                                <button type="button" className={`header__backline backline ${isVisible ? "backline_active" : ''}`} onClick={backline}>
                                    <img src={isVisible ? cross : backlineFoto} alt="Боковое меню" className="header__line" />
                                </button>
                            </>
                            :
                            <>
                                <Link className="header__button header__button_type_signup button" to="/signup"> Регистрация </Link>
                                <Link className="header__button header__button_type_signin button" to="/signin"> Войти</Link>
                            </>}
                    </div>
                </div >
                <nav className={`backline-menu ${isVisible ? 'backline-menu_visible' : ''}`}>
                    <div className="backline-menu__links">
                        <Link to="/" className={`backline-menu__link ${location.pathname === '/' ? 'backline-menu__link_active' : ''}`} onClick={backline}>Главная</Link>
                        <Link to="/movies" className={`backline-menu__link ${location.pathname === '/movies' ? 'backline-menu__link_active' : ''}`} onClick={backline}>Фильмы</Link>
                        <Link to="/saved-movies" className={`backline-menu__link ${location.pathname === '/saved-movies' ? 'backline-menu__link_active' : ''}`} onClick={backline}>Сохраненные фильмы</Link>
                    </div>
                    <Link to="/profile" className="backline-menu__profile-button account" onClick={backline}>
                        <p className='backline-menu__profile account__subtitle account__subtitle_black' >Аккаунт</p>
                        <img className='backline-menu__profile-picture account__picture account__picture_black' src={profile} alt="Картинка профиля" />
                    </Link>
                </nav>
            </header >
        </>
    )
}