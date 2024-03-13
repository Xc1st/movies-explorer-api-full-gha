import ErrorContext from "../contexts/ErrorContext"
import { useEffect, useContext } from "react"
import { useLocation } from 'react-router-dom'
import useFormValidation from "../hooks/useFormValidation"
import Input from "./Input"
import Icon from "../images/text__COLOR_invisible.png"
import FilterButton from "./FilterButton"

export default function SearchForm({ isCheck, searchedMovie, searchMovies, setIsError, firstEntrance, savedMovie, movies, filter, setIsCheck }) {
    const { pathname } = useLocation()
    const isError = useContext(ErrorContext)
    const { values, handleChange, reset } = useFormValidation()

    useEffect(() => {
        if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
            reset({ search: '' })
        } else {
            reset({ search: searchedMovie })
        }
        setIsError(false)
    }, [searchedMovie, reset, setIsError, pathname, savedMovie])

    function onSubmit(evt) {
        evt.preventDefault()
        if (evt.target.search.value) {
            searchMovies(evt.target.search.value)
            setIsError(false)
        } else {
            setIsError(true)
        }
    }

    function changeShort() {
        if (isCheck) {
            setIsCheck(false)
            filter(values.search, false, movies)
        } else {
            setIsCheck(true)
            filter(values.search, true, movies)
        }
    }

    return (
        <div className="search-films__search-string search-string" >
            <form className="search-string__box" onSubmit={onSubmit} noValidate>
                <Input
                    name={'search'}
                    value={values.search}
                    onChange={(e) => {
                        handleChange(e)
                        setIsError(false)
                    }}
                    required
                    type={'text'}
                    disabled={savedMovie ? (savedMovie.length === 0 && true) : false} />

                <button type="submit" className={`search-string__button ${savedMovie ? (location.pathname === '/saved-movies' && savedMovie.length === 0) && 'search-string__button_disabled' : ''}`}><img src={Icon} alt="" /></button>
            </form>
            <span className={`search-string__error error ${isError && 'search-string__error_active'}`}>{'Введите ключевое слово'}</span>
            <FilterButton changeShort={changeShort} firstEntrance={firstEntrance} isCheck={isCheck} />
        </div>
    )
}