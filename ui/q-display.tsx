'use client';

import { ParamProps} from "@/lib/custom-types";
import { QGen } from "@/lib/question-gen";
import React, {useEffect, useState} from 'react';
import { jetbrains } from "@/app/fonts";
import { Stopwatch, Timer }from "./timers";
import Streak from "./streak";
import QCount from "./q-count";


export default function QDisplay({params, onGoing, functions} : {params: ParamProps, onGoing: boolean, functions: any[]}) {
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState<string|number>();
    const [answer, setAnswer] = useState<string|number>();
    const [correct, setCorrect] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    
    
    useEffect(() => {
        const [x, y] = QGen({params: params});
        setQuestion(x);
        setAnswer(y);
    }, [params, streak]);

    const submit = React.useCallback((e?: any) => {
        if (parseFloat(input) === answer) {
            setCorrect(correct + 1);
            setInput("");
            setStreak(streak + 1);
        } else {
            setStreak(0);
            setInput("");
        }
    }, [answer, correct, streak, input]);

    const timeElement = React.useCallback(() => {
        if(params.time_mode === "timed") {
            return <Timer time={params.time_mode_val} ping={functions[1]}/>
        } else if (params.time_mode === "race") {
            return <Stopwatch/>
        } else {
            return null;
        }
    }, [params, functions]);
    
    return (
        <div onClick={functions[0]} onKeyDown={functions[2]} className="w-2/3 h-2/3 flex flex-col items-center justify-around relative">
            <div className={`w-full h-full flex flex-col justify-around items-center ${onGoing ? "":"blur-md"}`}>  
                {onGoing ? 
                    <div className="flex w-full justify-between">
                        {timeElement()}
                        <Streak count={streak}/>
                        <QCount count={correct} ping={functions[1]} total={params.time_mode === "race" ? params.time_mode_val : undefined}/>
                    </div> :
                null}  
                <p className={`${jetbrains.className} text-8xl text-hover-color`}>{question}</p>
                <div className="w-full border-secondary-bg-color border-8 rounded-lg h-20">
                    <input value={input} type="number" id="mainInput" onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" ? submit(): null} className={`w-full h-full focus:outline-hover-color bg-transparent text-ellipsis text-4xl text-hover-color ${jetbrains.className}`}></input>
                </div>
            </div>
            <div className={`w-full h-full flex flex-col items-center justify-evenly absolute ${onGoing ? "hidden": ""}`}>
                <p className={`${jetbrains.className} text-6xl text-text-color`}>Tap to Start</p>
                <p className={`${jetbrains.className} text-2xl text-text-color`}>Press <kbd className="bg-text-color rounded-sm text-main-bg-color px-2 py-1">Esc</kbd> to quit</p>
            </div>
        </div>
    )
}