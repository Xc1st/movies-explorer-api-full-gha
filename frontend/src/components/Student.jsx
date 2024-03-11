import me from "../images/me.jpg"
import arrow from "../images/arrow.svg"

export default function Student() {
    return (
        <section className="student">
            <div className="container container_student">
                <h2 className="student__title">Студент</h2>
                <div className="student__info">
                    <div className="student__info-about">
                        <h2 className="student__name">Даниил</h2>
                        <p className="student__profession">Фронтенд-разработчик, 23 года</p>
                        <p className="student__about">Я родился в Апатитах,а в данный момент живу и учусь в Санкт-Петербурге, закончил ЯФ ПГУПС. В прошлом был, полу-про игроком в кс-го, также занимаюсь спортом, закончил худ.школу.Надеюсь,что закончу обучение в Яндекс Практикуме, найду стажировку и меня возьмут на работу.</p>
                        <a href="https://github.com/Xc1st" target="_blank" rel="noreferrer" className="student__github link">Github</a>
                    </div>
                    <img src={me} alt="Фотография студента" className="student__info-img" />
                </div>
                <div className="student__portfolio">
                    <h3 className="student__portfolio-title">Портфолио</h3>
                    <ul className="student__portfolio-links">
                        <li className="student__portfolio-link">
                            <a href="https://xc1st.github.io/russian-travel/" target="_blank" rel="noreferrer" className="student__portfolio-link-text link">Статичный сайт</a>
                            <a href="https://xc1st.github.io/russian-travel/" className="student__portfolio-link-icon" target="_blank" rel="noreferrer">
                            <img src={arrow} alt="Стрелочка" />
                            </a>
                        </li>
                        <li className="student__portfolio-link">
                            <a href="https://xc1st.github.io/russian-travel/" target="_blank" rel="noreferrer" className="student__portfolio-link-text link" >Адаптивный сайт</a>
                            <a href="https://xc1st.github.io/russian-travel/" target="_blank" rel="noreferrer" className="student__portfolio-link-icon">
                                <img src={arrow} alt="Стрелочка" />
                            </a>
                        </li>
                        <li className="student__portfolio-link">
                            <a href="https://xc1st.github.io/mesto/" target="_blank" rel="noreferrer" className="student__portfolio-link-text link">Одностраничное приложение</a>
                            <a className="student__portfolio-link-icon" target="_blank" rel="noreferrer" href="https://xc1st.github.io/mesto/">
                                <img src={arrow} alt="Стрелочка" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

