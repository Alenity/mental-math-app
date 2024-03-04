'use client';

import { Operator, ParamProps, TimeMode } from "@/lib/custom-types";
import { QGen } from "@/lib/question-gen";
import React, {useEffect, useState} from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { jetbrains } from "@/app/fonts";
import ControlPanel from "./control-panel";


export default function QBoard() {
    const {toast} = useToast();
    const defaultParams: ParamProps = {operation: Operator.All, digit_count: 1, time_mode: TimeMode.Timed, time_mode_val: 30};
    const [params, setParams] = useState<ParamProps>(defaultParams);
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState<string|number>();
    const [answer, setAnswer] = useState<string|number>();
    const [streak, setStreak] = useState<number>(0);
    
    useEffect(() => {
        const [x, y] = QGen({params: params});
        setQuestion(x);
        setAnswer(y);
    }, [params, streak]);

    const recv = (data: ParamProps) => {
        setParams(data);
    }

    function submit(e: any) {
        setInput(e.target.value);
        if (parseFloat(e.target.value) === answer) {
            setStreak(prevStreak => prevStreak + 1);
            streak !== 0 ?
            toast({
                title: "Correct!",
                description: "Streak: " + streak,
            }) : null
            setInput("");
        }
        
    }
    
    return (
        <div className="w-2/3 h-full flex flex-col justify-around items-center p-5">
            <ControlPanel send={recv}/>
            <p className={`${jetbrains.className} text-8xl text-hover-color`}>{question}</p>
            <div className="w-full border-secondary-bg-color border-8 rounded-lg h-20">
                <input value={input} type="number" onChange={submit} autoFocus={true} className={`w-full h-full focus:outline-hover-color bg-transparent text-ellipsis text-4xl text-hover-color ${jetbrains.className}`}></input>
            </div>
            <Toaster/>
        </div>
    )
}