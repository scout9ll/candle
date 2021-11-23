import './Candle.scss'

export interface CandleProps {
    tag?: string
    head?: number
    bottom?: number
    length?: number
    trace?: string
}

export function CandleEle(props: CandleProps) {
    const isBurning = props.head && !props.bottom
    return (
        <div className={`candle ${isBurning ? "candle--burning" : ""}`}>
            <div className="candle__cotton" >
                <div className="candle__cotton_fire"></div>
                1
            </div>
            <div className="candle_body">

            </div>
        </div>
    )
}
