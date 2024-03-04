'use client';

import Divider from "./divider";
import { useEffect, useState } from "react";
import { jetbrains } from "@/app/fonts";
import { Operator, ParamProps, TimeMode } from "@/lib/custom-types";

export default function ControlPanel({send}: {send: Function}) {
    const [params, setParams] = useState<ParamProps>();
    const [operation, setOperation] = useState<Operator>(Operator.All);
    const [digitCount , setDigitCount] = useState<number>(1);
    const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.Timed);
    const [timeModeVal, setTimeModeVal] = useState<number>(30);
    
    function convert(e: any) {
        console.log(e.target?.value);
        switch (e.target?.value) {
            case "all":
                setOperation(Operator.All)
            case "/": 
                setOperation(Operator.Divide);
            case "-":
                setOperation(Operator.Subtract);
            case "x":
                setOperation(Operator.Multiply);
            case "+": 
                setOperation(Operator.All);
            case "infinite":
                setTimeMode(TimeMode.Inf);
            case "timed":
                setTimeMode(TimeMode.Timed);
            case "race":
                setTimeMode(TimeMode.Race);
        }
    }

    useEffect(() => {

    }, [operation, digitCount, timeMode, timeModeVal])


    return (
        <div className="w-full bg-secondary-bg-color p-3 flex justify-evenly border-2 rounded-lg border-secondary-bg-color">
            <div className="flex justify-around w-full flex-1">
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    all <input type="radio" onChange={e => convert(e)} value={Operator.Add} defaultChecked={true} name="ops" id="ops1" className="hidden"></input>
                </label>
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    + <input type="radio" onChange={e => convert(e)} value={Operator.Add} name="ops" id="ops1" className="hidden"></input>
                </label> 
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    - <input type="radio" onChange={e => convert(e)} value={Operator.Subtract} name="ops" id="ops2" className="hidden"></input>
                </label>
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    x <input type="radio" onChange={e => convert(e)} value={Operator.Multiply} name="ops" id="ops3" className="hidden"></input>
                </label>
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    / <input type="radio" onChange={e => convert(e)} value={Operator.Divide} name="ops" id="ops4" className="hidden"></input>
                </label>
            </div>
            <Divider props={false} />
            <input type="number" min={1} max={10} value={digitCount} onChange={e => setDigitCount(parseInt(e.target.value))} step={1} className="flex-1 bg-transparent text-hover-color focus:outline-none"></input> {/*Digit Count*/}
            <Divider props={false} />
            <div className="flex justify-around w-full flex-1">
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    inf <input type="radio" onChange={e => convert(e)} value={TimeMode.Inf} name="timeMode" id="timeMode1" className="hidden"></input>
                </label>
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    timed <input type="radio" onChange={e => convert(e)} value={TimeMode.Timed} name="timeMode" id="timeMode2" defaultChecked={true} className="hidden"></input>
                </label> 
                <label className={`text-hover-color has-[:checked]:text-accent-color ${jetbrains.className}`}>
                    race <input type="radio" onChange={e => convert(e)} value={TimeMode.Race} name="timeMode" id="timeMode3" className="hidden"></input>
                </label>
            </div>
            <Divider props={false} />
            <input type="number" disabled={timeMode === TimeMode.Inf ? true : false} min={1} step={timeMode === TimeMode.Race ? 1 : 5 } value={timeModeVal} onChange={e => setTimeModeVal(parseInt(e.target.value))} className="flex-1 bg-transparent focus:outline-none text-hover-color"></input> {/*Time Value*/}
        </div>
    );
}