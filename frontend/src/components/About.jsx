function About() {
    return (
        <section id="about" className="about">
            <div className="container container_about">
                <h2 className="about__title">О проекте</h2>
                <div className="about__info-container">
                    <div className="about__info">
                        <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about__info-caption">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about__info">
                        <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about__info-caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about__timelearn">
                    <div className="about__timelearn-container">
                        <p className="about__timelearn-progress about__timelearn-progress_backend">1 неделя</p>
                        <p className="about__timelearn-text">Back-end</p>
                    </div>
                    <div className="about__timeline-container">
                        <p className="about__timelearn-progress about__timelearn-progress_frontend">4 недели</p>
                        <p className=" about__timelearn-text">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About