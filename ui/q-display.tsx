'use client';

import { DataProps, ParamProps} from "@/lib/custom-types";
import { QGen } from "@/lib/question-gen";
import React, {useEffect, useState, useMemo} from 'react';



export default function QDisplay({params, onGoing, update, functions} : {params: ParamProps, onGoing: boolean, update: any, functions: any[]}) {

    const startData : DataProps = useMemo(() => ({totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], streak: 0}), [params?.time_mode_val]);
    const [input, setInput] = useState('');
    const [answer, setAnswer] = useState<string|number>();
    const [question, setQuestion] = useState<string|number>();
    const [data, setData] = useState<DataProps>(startData);
    const [correct, setCorrect] = useState<boolean>(false);

    const refresh = React.useCallback(() => {
        const [x, y] = QGen({params: params});
        setQuestion(x);
        setAnswer(y);
        setData(data => ({...data, questionHistory: [...data.questionHistory, String(x)]}));
    }, [params]);

    const submit = React.useCallback(() => {
        if (parseFloat(input) === answer) {
            setCorrect(true);
            update({correct: correct});
            setInput("");
            refresh();
        } else {
            setCorrect(false)
            update({correct: correct});
            setInput("");
            refresh();
        }
    }, [answer, input, refresh, update, correct]);

    useEffect(() => {
        refresh();
        setInput("");
    }, [refresh]);
    
    return (
        <div onClick={functions[0]} onKeyDown={functions[1]} className="sm:w-full w-2/3 h-2/3 flex flex-col items-center justify-around relative">
            <div className={`w-full h-full flex flex-col justify-around items-center ${onGoing ? "":"blur-md"}`}>  
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