import {useNavigate} from "react-router-dom"

export default function NFEPage() {
    const navigate = useNavigate()
    return (
        <section className='error-page'>
            <div className='container container_error-page'>
                <h1 className='error-page__title'>404</h1>
                <p className='error-page__text'>Страница не найдена</p>
            </div>
            <button to="/" onClick={() => navigate(-1)} className='error-page__link'>Назад</button>
        </section>
    )
}