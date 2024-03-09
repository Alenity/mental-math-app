'use client';

import { DataProps, ParamProps} from "@/lib/custom-types";
import { QGen } from "@/lib/question-gen";
import React, {useEffect, useState, useMemo} from 'react';
import { Stopwatch, Timer }from "./timers";
import Streak from "./streak";
import QCount from "./q-count";


export default function QDisplay({params, onGoing, report, functions} : {params: ParamProps, onGoing: boolean, report: any, functions: any[]}) {
    const startData : DataProps = useMemo(() => ({totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], streak: 0}), [params?.time_mode_val]);
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState<string|number>();
    const [answer, setAnswer] = useState<string|number>();
    const [data, setData] = useState<DataProps>(startData);

    useEffect(() => {
        const [x, y] = QGen({params: params});
        setQuestion(x);
        setAnswer(y);
        setData(prevData => ({...prevData, questionHistory: [...prevData.questionHistory, String(x)]}));
    }, [params, data.streak, onGoing]);

    const submit = React.useCallback((e?: any) => {
        if (parseFloat(input) === answer) {
            setData(data => ({...data, questionsCorrect: data.questionsCorrect++, streak: data.streak++}));
            setInput("");
        } else {
            setData(data => ({...data, streak: 0}));
            setInput("");
        }
    }, [answer, input]);

    const timeElement = React.useCallback(() => {
        if(params.time_mode === "timed") {
            return <Timer time={params.time_mode_val} ping={() => {report(); setData(startData)}}/>
        } else if (params.time_mode === "race") {
            return <Stopwatch/>
        } else {
            return null;
        }
    }, [params, startData, report]);
    
    return (
        <div onClick={functions[0]} onKeyDown={functions[1]} className="sm:w-full w-2/3 h-2/3 flex flex-col items-center justify-around relative">
            <div className={`w-full h-full flex flex-col justify-around items-center ${onGoing ? "":"blur-md"}`}>  
                {onGoing ? 
                    <div className="flex w-full justify-between flex-1 ">
                        {timeElement()}
                        <Streak count={data.streak}/>
                        <QCount count={data.questionsCorrect} ping={() => {report(); setData(startData)}} total={params.time_mode === "race" ? params.time_mode_val : undefined}/>
                    </div> :
                null}  
                <div className="flex items-center justify-center flex-1">
                <p className={`text-8xl text-justify text-hover-color`}>{question}</p>
                </div>
                <div className="w-full items-center flex justify-center flex-1">
                    <div className="border-secondary-bg-color border-8 rounded-lg w-full lg:w-2/3 h-1/3">
                        <input value={input} type="number" id="mainInput" onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" ? submit(): null} className={`w-full h-full focus:outline-hover-color bg-transparent text-ellipsis text-4xl text-hover-color`}></input>
                    </div>
                </div> 
            </div>
            <div className={`w-full h-full flex flex-col items-center justify-evenly absolute ${onGoing ? "hidden": ""}`}>
                <p className={`sm:text-5xl text-6xl text-text-color`}>Tap to Start</p>
                <p className={`text-xl text-text-color`}>Press <kbd className="bg-text-color rounded-sm text-main-bg-color px-2 py-1">Esc</kbd> to quit</p>
            </div>
        </div>
    )
}