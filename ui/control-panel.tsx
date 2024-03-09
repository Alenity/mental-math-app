'use client';

import Divider from "./divider";
import { useEffect, useState, useCallback } from "react";
import { jetbrains } from "@/app/fonts";
import { Operator, ParamProps, TimeMode } from "@/lib/custom-types";
import NumInput from "./num-input";

export default function ControlPanel({exchange, hidden}: {exchange: any, hidden: boolean}) {
    let defaultParams: ParamProps = {operation: Operator.All, digit_count: 1, time_mode: TimeMode.Timed, time_mode_val: 30};
    const [params, setParams] = useState<ParamProps>(defaultParams);
    
    useEffect(() => {
        exchange(params);
    }, [params, exchange])

    const step = (up: boolean, id: string) => {
        let input: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
        up ? input.stepUp() : input.stepDown();
        id === "digitCount" ? setParams({...params, digit_count: input.valueAsNumber}) : setParams({...params, time_mode_val: input.valueAsNumber});
    }
    
    const convert = useCallback((e: any) => {
        switch (e.target.value) {
            case "all":
                setParams({...params, operation: Operator.All});
                break;
            case "/": 
                setParams({...params, operation: Operator.Divide});
                break;
            case "-":
                setParams({...params, operation: Operator.Subtract});
                break;
            case "x":
                setParams({...params, operation: Operator.Multiply});
                break;
            case "+": 
                setParams({...params, operation: Operator.Add});
                break;
            case "infinite":
                setParams({...params, time_mode: TimeMode.Inf});
                break;
            case "timed":
                setParams({...params, time_mode: TimeMode.Timed});
                break;
            case "race":
                setParams({...params, time_mode: TimeMode.Race});
                break;
            default:
                break;
        }
    }, [params]);


    return (
        <div className={`sm:w-full md:w-full lg:w-2/3 bg-secondary-bg-color p-3 flex justify-evenly border-2 rounded-lg border-secondary-bg-color ${hidden ? "hidden" : ""}`}>
            <div className="flex justify-around w-full flex-3">
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    all <input type="radio" onChange={e => convert(e)} value={Operator.All} defaultChecked={true} name="ops" id="ops1" className="hidden"></input>
                </label>
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    + <input type="radio" onChange={e => convert(e)} value={Operator.Add} name="ops" id="ops1" className="hidden"></input>
                </label> 
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    - <input type="radio" onChange={e => convert(e)} value={Operator.Subtract} name="ops" id="ops2" className="hidden"></input>
                </label>
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    x <input type="radio" onChange={e => convert(e)} value={Operator.Multiply} name="ops" id="ops3" className="hidden"></input>
                </label>
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    / <input type="radio" onChange={e => convert(e)} value={Operator.Divide} name="ops" id="ops4" className="hidden"></input>
                </label>
            </div>
            <Divider props={false}/>
            <NumInput label="Digit(s)" callBack={step} childID="digitCount">
                <input type="number" id="digitCount" size={4} min={1} max={10} readOnly value={params.digit_count} step={1} className="text-center bg-transparent text-hover-color focus:outline-none"></input>
            </NumInput>
            <Divider props={false}/>
            <div className="flex justify-around w-full flex-3">
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    inf <input type="radio" onChange={e => convert(e)} value={TimeMode.Inf} name="timeMode" id="timeMode1" className="hidden"></input>
                </label>
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    timed <input type="radio" onChange={e => convert(e)} value={TimeMode.Timed} name="timeMode" id="timeMode2" defaultChecked={true} className="hidden"></input>
                </label> 
                <label className={`flex-1 text-center text-hover-color has-[:checked]:text-accent-color`}>
                    race <input type="radio" onChange={e => convert(e)} value={TimeMode.Race} name="timeMode" id="timeMode3" className="hidden"></input>
                </label>
            </div>
            <Divider props={false}/>
            <NumInput label={params.time_mode === TimeMode.Timed ? "Sec(s)" : "Question(s)"} callBack={step} childID="timeModeVal">
                <input type="number" id="timeModeVal" size={4} disabled={params.time_mode === TimeMode.Inf ? true : false} min={0} step={params.time_mode === TimeMode.Race ? 1 : 5 } value={params.time_mode_val} onChange={e => setParams({...params, time_mode_val: parseInt(e.target.value)})} className="bg-transparent focus:outline-none text-hover-color disabled:text-text-color text-center"></input> 
            </NumInput>
        </div>
    );
}