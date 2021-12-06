import myTcbService from "./tcb.serivice"

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
    static async addCandle(candle: Candle) {
        const { uid } = await myTcbService.getUserInfo()
        return myTcbService.getCollection('candles').add({ ...candle, uid })
    }

    static async updateCandle(candle: Candle) {
        console.log('updateCandle', candle)
        return myTcbService.getCollection('candles').where({
            head: candle.head
        }).update({
            bottom: candle.bottom,
            length: candle.length,
            trace: candle.trace
        }).then((res) => {
            console.log(res.code);
        });
    }
    static async getCandleList(): Promise<Candle[]> {
        const { uid } = await myTcbService.getUserInfo()

        const { data } = await myTcbService.getCollection('candles').where({
            uid: uid
        }).get()
        console.log(data)
        return data
    }
}

export default CandleService