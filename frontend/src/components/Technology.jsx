export default function Technology(){
    return(
        <section className="technology">
            <div className="container container_technology">
                <h2 className="technology__title">Технологии</h2>
                <div className="technology__about">
                    <h3 className="technology__about-title">7 технологий</h3>
                    <p className="technology__caption">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                    <ul className="technology__lists">
                        <li className="technology__list">HTML</li>
                        <li className="technology__list">CSS</li>
                        <li className="technology__list">JS</li>
                        <li className="technology__list">React</li>
                        <li className="technology__list">Git</li>
                        <li className="technology__list">Express.js</li>
                        <li className="technology__list">mongoDB</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}