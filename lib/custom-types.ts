export type ParamProps = {
    operation: Operator;
    digit_count: number;
    time_mode: TimeMode;
    time_mode_val: number;
}

export type OperationLog = {
    addition: number[];
    subtraction: number[];
    multiplication: number[];
    division: number[];
}

export type DataProps = {
    totalQuestions: number;
    questionsCorrect: number;
    timePerQuestion: number[];
    questionHistory: string[];
    streak: number;
    perOperation?: OperationLog;
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