import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {
    const location = useLocation()
    const [loved, setIsLoved] = useState(false)

    useEffect(() => {
        if (location.pathname === '/movies')
        setIsLoved(savedMovies.some(element => data.id === element.movieId))
    }, [savedMovies, data.id, setIsLoved, location.pathname])

    function cardLike() {
        if (savedMovies.some(e => data.id === e.movieId)) {
            setIsLoved(true)
            addMovie(data)
        } else {
            setIsLoved(false)
            addMovie(data)
        }
    }

    function convertTime(duration) {
        const minutes = duration % 60;
        const hours = Math.floor(duration / 60);
        return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
    }
    return (
        <li className="search-films__card card">
            <Link to={data.trailerLink} target="_blank">
                <img src={location.pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className="card__img" />
            </Link>
            <div className="card__banner">
                <div className="card__text">
                    <h3 className="card__title">{data.nameRU}</h3>
                    <p className="card__time">{convertTime(data.duration)}</p>
                </div>
                {location.pathname === '/movies' ?
                    <button type="button" className={`card__submit ${loved ? 'card__submit_active' : ''}`} onClick={cardLike}></button>
                    :
                    <button type="button" className={`card__submit card__submit_x`} onClick={() => onDelete(data._id)}>+</button>
                }
            </div>
        </li>
    )
}