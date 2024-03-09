'use client';
import QDisplay from "./q-display";
import { DataProps, ParamProps } from "@/lib/custom-types";
import { useRouter } from "next/navigation";
import { SetStateAction, useState, useCallback } from "react";
import ControlPanel from "./control-panel";

export default function QBoard() {
    const router = useRouter();
    const [params, setParams] = useState<ParamProps>(null!);
    const [data, setData] = useState<DataProps>(null!);
    const [onGoing, setOnGoing] = useState<boolean>(false);    
    let startData : DataProps = {totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], streak: 0};

    const exchange = useCallback((params: SetStateAction<ParamProps>) => {
        setParams(params);
    }, []);

    const report = useCallback((data: SetStateAction<DataProps>) => {
        setData(startData);
        // router.push('/results');
        setOnGoing(false);
    }, [router])

    const shortCuts = useCallback((event: any) => {
        switch (event.key) {
            case "Escape":
                onGoing ? setOnGoing(false) : null;
                break;
            case "Enter": 
                
                break;
            default: 
                break;
        }
    }, [onGoing]);

    const testStart = useCallback(() => {
        setOnGoing(true);
        document.getElementById("mainInput")?.focus();
    }, []);

   

    return (
        <div autoFocus={true} onKeyDown={shortCuts} className="w-full h-full flex flex-col items-center justify-around">
            <ControlPanel exchange={exchange} hidden={onGoing}/>
            <QDisplay params={params} onGoing={onGoing} report={report} functions={[testStart, shortCuts]}/>
        </div>
    );
}