import React, { useState } from 'react';


export interface endFormProps {
    onSubmit: (trace: string) => void
}


const EndForm: React.FC<endFormProps> = (props) => {


    const [candleTrace, setCandleTrace] = useState<string>('')

    return (
        <div className="endStartForm">
            <div className="endForm">
                trace
                <input type="text" name="" id="" onInput={val => setCandleTrace(val.currentTarget.value)} value={candleTrace} />
                <button onClick={() => props.onSubmit(candleTrace)}>确定</button>
            </div>

        </div>
    );
}

export default EndForm;
