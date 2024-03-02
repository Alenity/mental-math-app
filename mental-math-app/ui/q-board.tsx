'use client';

import { QGen, Operator, Props } from "@/lib/question-gen";
import React, {useEffect, useState} from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";


export default function QBoard() {
    const {toast} = useToast();
    const defaultParams = {operation: Operator.Add, digit_count: 2};
    const [params, setParams] = useState<Props>(defaultParams);
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState<string|number>();
    const [answer, setAnswer] = useState<string|number>();
    const [streak, setStreak] = useState<number>(0);
    
    useEffect(() => {
        const [x, y] = QGen({props: params});
        setQuestion(x);
        setAnswer(y);
    }, [params, streak]);

    function submit(e: any) {
        console.log(e.target.value);
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
        <div className="w-2/3 h-2/3 flex flex-col justify-around items-center p-5">
            <p className="font-mono text-8xl text-hover-color">{question}</p>
            <div className="w-full border-secondary-bg-color border-8 rounded-lg h-20">
                <input value={input} onChange={submit} autoFocus={true} className="w-full h-full bg-main-bg-color text-ellipsis text-4xl text-hover-color font-mono"></input>
            </div>
            <Toaster/>
        </div>
    )
}