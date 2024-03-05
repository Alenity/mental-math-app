'use client';

import { Operator, ParamProps, TimeMode } from "@/lib/custom-types";
import { QGen } from "@/lib/question-gen";
import React, {useEffect, useState} from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { jetbrains } from "@/app/fonts";


export default function QDisplay({params} : {params: ParamProps}) {
    const {toast} = useToast();
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState<string|number>();
    const [first, setFirst] = useState<boolean>(true);
    const [answer, setAnswer] = useState<string|number>();
    const [streak, setStreak] = useState<number>(0);
    
    
    useEffect(() => {
        const [x, y] = QGen({params: params});
        setQuestion(x);
        setAnswer(y);
    }, [params, streak]);


    const submit = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, [answer, streak, toast]);
    
    return (
        <div className="w-2/3 h-2/3 flex flex-col justify-around items-center p-5">
            <p className={`${jetbrains.className} text-8xl text-hover-color`}>{question}</p>
            <div className="w-full border-secondary-bg-color border-8 rounded-lg h-20">
                <input value={input} type="number" onChange={submit} autoFocus={true} className={`w-full h-full focus:outline-hover-color bg-transparent text-ellipsis text-4xl text-hover-color ${jetbrains.className}`}></input>
            </div>
            <Toaster/>
        </div>
    )
}