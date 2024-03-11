import ErrorContext from "../contexts/ErrorContext"
import { useEffect, useContext } from "react"
import { useLocation } from 'react-router-dom'
import useFormValidation from "../hooks/useFormValidation"
import Input from "./Input"
import Icon from "../images/text__COLOR_invisible.png"
import FilterButton from "./FilterButton"

export default function SearchForm({ isCheck, searchedMovie, searchMovies, setIsError, firstEntrance, savedMovie, movies, filter, setIsCheck }) {
    const location = useLocation()
    const isError = useContext(ErrorContext)
    const { values, handleChange, reset } = useFormValidation()

    useEffect(() => {
        if ((location.pathname === '/saved-movies' && savedMovie.length === 0)) {
            reset({ search: '' })
        } else {
            reset({ search: searchedMovie })
        }
        setIsError(false)
    }, [searchedMovie, reset, setIsError, location.pathname, savedMovie])

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
                    name={'search-string'}
                    value={values.search}
                    onChange={(e) => {
                        handleChange(e)
                        setIsError(false)
                    }}
                    required
                    type={'text'} />
                <button type="submit" className={`search-string__button${savedMovie ? (location.pathname === '/saved-movies' && savedMovie.length === 0) && 'search-string__button_disabled' : ''}`}><img src={Icon} alt="" /></button>
            </form>
            <FilterButton changeShort={changeShort} firstEntrance={firstEntrance} isCheck={isCheck} />
            {/* <div className="search-string__shorts">
                <button className="search-string__shorts-button" onClick={black}></button>
                <p className="search-string__shorts-subtitle">Короткометражки</p>
            </div> */}
        </div>
    )
}