'use client';
import QDisplay from "./q-display";
import { DataProps, ParamProps } from "@/lib/custom-types";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import ControlPanel from "./control-panel";
import Stats from "./stats";

export default function QBoard() {
    const router = useRouter();
    const [params, setParams] = useState<ParamProps>(null!);
    const startData : DataProps = useMemo(() => ({totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], streak: 0}), [params?.time_mode_val]);
    const [data, setData] = useState<DataProps>(startData);
    const [onGoing, setOnGoing] = useState<boolean>(false);    

    const update = useCallback(({params, correct} : {params?: ParamProps, correct?: boolean}) => {
        params !== undefined ? setParams(params) : null;
        if (correct !== undefined) {
            correct ? setData(data => ({...data, questionsCorrect: ++data.questionsCorrect, streak: ++data.streak})) : setData(data => ({...data, streak: 0}));
        }
    }, []);

    const report = useCallback((report: DataProps) => {
        setData(data => ({...data, report}))
        // router.push('/results');
        setOnGoing(false);
    }, [])

    const shortCuts = useCallback((event: any) => {
        switch (event.key) {
            case "Escape":
                onGoing ? setOnGoing(false) : null;
                break;
            default: 
                break;
        }
    }, [onGoing]);

    const testStart = useCallback(() => {
        setData(startData);
        setOnGoing(true);
        document.getElementById("mainInput")?.focus();
    }, [startData]);

    return (
        <div autoFocus={true} onKeyDown={shortCuts} className={`w-full h-full flex flex-col items-center justify-around`}>
            {onGoing ? <Stats params={params} data={data} report={report}/> : <ControlPanel update={update}/>}
            <QDisplay params={params} onGoing={onGoing} update={update} functions={[testStart, shortCuts]}/>
        </div>
    );
}