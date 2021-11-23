import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import StartForm from './components/StartForm'
import EndForm from './components/EndForm';
import { getDurationByStartTime } from './utils';
import CandleService from './services/candle.service';
import { CandleEle } from './components/Candle';


interface Candle {
  tag?: string
  head?: number
  bottom?: number
  length?: number
  trace?: string
}


function App() {
  // init current candle info

  const [showStartForm, setStartForm] = useState<boolean>(false)
  const [showEndForm, setEndForm] = useState<boolean>(false)
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

  function onCandleStart(tag: string) {
    const startTime = Date.now()
    console.log(tag, startTime)
    const startCandleInfo = { ...currentCandleInfo, tag: tag, head: startTime }
    setCurrentCandleInfo(startCandleInfo)
    setStartForm(false)

    // saveStartInfo
    CandleService.addCandle(startCandleInfo)
    // todo  length 作为属性 不需要事实更新(上传)
    durationInterval.current = window.setInterval(() => {
      setCurrentCandleInfo(info => { return { ...info, length: getDurationByStartTime(startTime) } })
    }, 1000)
  }

  function onCandleEnd(trace: string) {
    window.clearInterval(durationInterval.current)
    const endTime = Date.now()
    const completeCanleInfo = { ...currentCandleInfo, trace: trace, bottom: endTime }
    setCurrentCandleInfo({})
    setEndForm(false)
    // saveCompleteInfo
    CandleService.updateCandle(completeCanleInfo)
    console.log('completeCanleInfo', completeCanleInfo)
  }
  
  return (
    <div className="App">
      <CandleEle  {...currentCandleInfo} />
      <div className="candle_control">
        {(currentCandleInfo.head && !currentCandleInfo.bottom) ?
          // on  burning
          <div>
            {currentCandleInfo.tag}- -{currentCandleInfo.length}

            <button
              onClick={() => { setEndForm(true) }}>
              done
            </button>
          </div> :
          //  to start
          (
            (<button onClick={() => { setStartForm(true) }}>
              开始
            </button>)
          )}
        {showStartForm && (<StartForm onSubmit={onCandleStart} />)}
        {showEndForm && (<EndForm onSubmit={onCandleEnd} />)}
      </div>


    </div>
  );
}

export default App;
