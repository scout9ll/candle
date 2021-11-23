export function getDurationByStartTime(startTime: number) {
    const nowTime = Date.now()
    return Number(((nowTime - startTime) / 1000).toFixed())
}