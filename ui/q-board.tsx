'use client';
import QFunction from "./q-function";
import { DataProps, ParamProps, AppState, StartType } from "@/lib/custom-types";
import { useState, useCallback, useMemo } from "react";
import ControlPanel from "./control-panel";
import Stats from "./stats";
import ResultPage from "./result-page";

export default function QBoard() {
    const [params, setParams] = useState<ParamProps>(null!);
    const startData : DataProps = useMemo(() => ({totalQuestions: params?.time_mode_val, questionsCorrect: 0, timePerQuestion: [], questionHistory: [], answerHistory: [], streak: 0}), [params?.time_mode_val]);
    const [data, setData] = useState<DataProps>(startData);
    const [appState, setAppState] = useState<AppState>(AppState.Prep);    

    const update = useCallback(({params, correct, question, answer, tPQ} : {params?: ParamProps, correct?: boolean, question?: string, answer?: number, tPQ?: number}) => {
        params !== undefined ? setParams(params) : null;
        if (correct !== undefined) {
            correct ? setData(data => ({...data, questionsCorrect: ++data.questionsCorrect, streak: ++data.streak})) : setData(data => ({...data, streak: 0}));
        }
        question !== undefined ? setData(data => ({...data, questionHistory: [...data.questionHistory, question]})) : null;
        answer !== undefined ? setData(data => ({...data, answerHistory: [...data.answerHistory, answer]})) : null;
        //tPQ means timePerQuestion, I know bad practice and whatnot but I didn't want to get it mixed up with data.timePerQuestion
        tPQ !== undefined ? setData(data => ({...data, timePerQuestion: [...data.timePerQuestion, tPQ]})) : null;
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

    const testStarter = useCallback((startType: StartType, refreshFunc?: () => void) => {
        setData(data => ({...data, streak: 0, totalQuestions: params?.time_mode_val, questionHistory: [], questionsCorrect: 0, timePerQuestion: []}));
        switch (startType) {
            case StartType.Restart:
                setAppState(AppState.OnGoing);
                break;
            case StartType.Redo:
                setAppState(AppState.OnGoing);
                break;
            case StartType.New:
                setAppState(AppState.Prep);
                break;
            default:
                setAppState(AppState.Prep);
        }
        document.getElementById("mainInput")?.focus();
    }, [params?.time_mode_val]);

    return (
        <>
            {appState === AppState.Done ? (
                <ResultPage data={data} restart={testStarter}/>
            ) : (
                <div autoFocus={true} onKeyDown={shortCuts} className={`w-full h-full flex flex-col items-center justify-around`}>
                    {appState === AppState.Prep ? <ControlPanel update={update} /> : <Stats params={params} data={data} ping={report}/>}
                    <QFunction params={params} appState={appState} update={update} start={testStarter} shortcuts={shortCuts} />
                </div>
            )}
        </>
    );
}