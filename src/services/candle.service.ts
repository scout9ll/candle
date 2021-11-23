
interface Candle {
    tag?: string
    head?: number
    bottom?: number
    length?: number
    trace?: string
}

class CandleService {
    private static itemTag = 'lsCandle'
    // constructor() {

    // }
    static addCandle(candle: Candle) {
        const candleList = CandleService.getCandleList()
        candleList.push(candle)
        localStorage.setItem(CandleService.itemTag, JSON.stringify(candleList))
    }

    static updateCandle(candle: Candle) {
        const candleList = CandleService.getCandleList()
        candleList[candleList.length - 1] = candle
        localStorage.setItem(CandleService.itemTag, JSON.stringify(candleList))
    }
    static getCandleList(): Candle[] {
        const candleListString = localStorage.getItem(CandleService.itemTag) || '[]'
        return JSON.parse(candleListString)
    }
}

export default CandleService