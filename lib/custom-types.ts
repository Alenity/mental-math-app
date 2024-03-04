export type ParamProps = {
    operation: Operator;
    digit_count: number;
    time_mode: TimeMode;
    time_mode_val: number;
}

export enum TimeMode {
    Inf = "infinite",
    Timed = "timed",
    Race = "race",
}

export enum Operator {
    All = "all",
    Add = "+",
    Subtract = "-",
    Divide = "/",
    Multiply = "x",
}