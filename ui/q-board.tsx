'use client';
import QDisplay from "./q-display";
import { DataProps, ParamProps, AppState } from "@/lib/custom-types";
import { useState, useCallback, useMemo } from "react";
import ControlPanel from "./control-panel";
import Stats from "./stats";
import ResultPage from "./result-page";

export default function QBoard() {
    const [params, setParams] = useState<ParamProps>(null!);
    const startData : DataProps = useMemo(() => ({totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], streak: 0}), [params?.time_mode_val]);
    const [data, setData] = useState<DataProps>(startData);
    const [appState, setAppState] = useState<AppState>(AppState.Prep);    

    const update = useCallback(({params, correct, question} : {params?: ParamProps, correct?: boolean, question?: string}) => {
        params !== undefined ? setParams(params) : null;
        if (correct !== undefined) {
            correct ? setData(data => ({...data, questionsCorrect: ++data.questionsCorrect, streak: ++data.streak})) : setData(data => ({...data, streak: 0}));
        }
        question !== undefined ? setData(data => ({...data, questionHistory: [...data.questionHistory, question]})) : null;
    }, []);

    const report = useCallback(() => {
        setAppState(AppState.Done)
    }, [])

    const shortCuts = useCallback((event: any) => {
        switch (event.key) {
            case "Escape":
                appState === AppState.OnGoing ? setAppState(AppState.Prep) : null;
                break;
            default: 
                break;
        }
    }, [appState]);

    const testStart = useCallback(() => {
        setAppState(AppState.OnGoing)
        setData(data => ({...data, streak: 0, totalQuestions: params?.time_mode_val, questionHistory: [], questionsCorrect: 0, timePerQuestion: []}));
        document.getElementById("mainInput")?.focus();
    }, [params?.time_mode_val]);

    return (
        <>
            {appState === AppState.Done ? (
                <ResultPage data={data} />
            ) : (
                <div autoFocus={true} onKeyDown={shortCuts} className={`w-full h-full flex flex-col items-center justify-around`}>
                    {appState === AppState.Prep ? <ControlPanel update={update} /> : <Stats params={params} data={data} ping={report}/>}
                    <QDisplay params={params} appState={appState} update={update} functions={[testStart, shortCuts]} />
                </div>
            )}
        </>
    );
}