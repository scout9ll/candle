import React from 'react'
import useCandle from '../hooks/useCandle'
import './Candle.scss'


export default function CandleEle() {
    const [currentCandleInfo, setCandleStart, setCandleEnd] = useCandle()
    const isBurning = !!currentCandleInfo.head && !currentCandleInfo.bottom
    function onLightCandle(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            setCandleStart(e.currentTarget.value)
            console.log('setCandleStart', e.currentTarget.value)
        }
    }

    function onPutoffCandle(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            setCandleEnd(e.currentTarget.value)
            console.log('onPutoffCandle', e, e.currentTarget.value)
        }
    }
    return (
        <div className="candle-container">
            <div className={`candle ${isBurning ? "candle--burning" : ""}`}>
                <div className="candle__cotton" >
                    <div className="candle__cotton_fire"></div>
                </div>
                <div className="candle_body">

                </div>
            </div>
            <div className="candle-input">

                <div className="light-input__contanier">
                    {
                        isBurning ?
                            (<span className="light-text">I have been burning <span className="light-tag-text">{currentCandleInfo.tag}</span> for <span className="light-time-text">{currentCandleInfo.length}</span> seconds</span>)
                            :
                            (<><span className="light-text">I am lighting </span><input type="text" className="light-input" onKeyDown={onLightCandle} disabled={isBurning} /></>)
                    }
                </div>
                {isBurning && (<div className="putoff-input__contanier">    
                    '<input type="text" className="light-input" onKeyDown={onPutoffCandle} /><span className="putoff-text">' is engraved on the candle's body</span>
                </div>)}
            </div>
        </div>
    )
}
