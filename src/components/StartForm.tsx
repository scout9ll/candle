import React, { useState } from 'react';


export interface StartFormProps {
    onSubmit: (tag: string) => void
}


const StartForm: React.FC<StartFormProps> = (props) => {


    const [candleTag, setCandleTag] = useState<string>('')

    return (
        <div className="showStartForm">
            <div className="startForm">
                tag
                <input type="text" name="" id="" onInput={val => setCandleTag(val.currentTarget.value)} value={candleTag} />
                <button onClick={() => props.onSubmit(candleTag)}>确定</button>
            </div>

        </div>
    );
}

export default StartForm;
