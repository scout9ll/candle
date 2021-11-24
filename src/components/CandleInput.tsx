export function CandleInput() {
    return (
        <div className="candle-input">
            <div className="light-input__contanier">
                <span className="light-text">I am lighting</span><input type="text" className="light-input" />
            </div>
            <div className="putoff-input__contanier">
                <input type="text" className="light-input" /><span className="putoff-text">is engraved on the candle's body</span>
            </div>
        </div>
    )
}