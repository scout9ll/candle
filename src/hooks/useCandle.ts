import { useEffect, useRef, useState } from "react"
import CandleService from "../services/candle.service"
import { getDurationByStartTime } from "../utils"

interface Candle {
    tag?: string
    head?: number
    bottom?: number
    length?: number
    trace?: string
}




export default function useCandle(): [Candle, (tag: string) => void, (trace: string) => void] {
    const [currentCandleInfo, setCurrentCandleInfo] = useState<Candle>({})
    const durationInterval = useRef(0)
    useEffect(() => {
        const candleList = CandleService.getCandleList()
        const lastCandle = candleList[candleList.length - 1] || {}


        if (lastCandle.head && !lastCandle.bottom) {
            setCurrentCandleInfo(lastCandle)
            durationInterval.current = window.setInterval(() => {
                setCurrentCandleInfo(info => { return { ...info, length: getDurationByStartTime((lastCandle.head as number)) } })
            }, 1000)
        } else {
            setCurrentCandleInfo({})
        }
    }, [])

    function setCandleStart(tag: string) {
        const startTime = Date.now()
        console.log(tag, startTime)
        const startCandleInfo = { ...currentCandleInfo, tag: tag, head: startTime }
        setCurrentCandleInfo(startCandleInfo)

        // saveStartInfo
        CandleService.addCandle(startCandleInfo)
        // todo  length 作为属性 不需要事实更新(上传)
        durationInterval.current = window.setInterval(() => {
            setCurrentCandleInfo(info => { return { ...info, length: getDurationByStartTime(startTime) } })
        }, 1000)
    }

    function setCandleEnd(trace: string) {
        window.clearInterval(durationInterval.current)
        const endTime = Date.now()
        const completeCanleInfo = { ...currentCandleInfo, trace: trace, bottom: endTime }
        setCurrentCandleInfo({})
        // saveCompleteInfo
        CandleService.updateCandle(completeCanleInfo)
        console.log('completeCanleInfo', completeCanleInfo)
    }
    return [currentCandleInfo, setCandleStart, setCandleEnd]
}