export default function FilterButton({ isCheck, changeShort, firstEntrance }) {
    return (
        <div className="search-string__shorts">
            <button className={`search-string__shorts-button ${isCheck ? "search-string__shorts-button_active" : ''}`} type="button" onClick={() => changeShort()} disabled={firstEntrance} />
            <p className="search-string__shorts-subtitle">Короткометражки</p>
        </div>
    )
}
