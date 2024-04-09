export type ParamProps = {
    operation: Operator;
    digit_count: number;
    time_mode: TimeMode;
    time_mode_val: number;
}

export enum AppState {
    Prep = "prep",
    OnGoing = "ongoing",
    Done = "done",
}

export enum UserState {
    Anon = "anonymous",
    Auth = "authenticated",
    Null = "void",
}

export type OperationLog = {
    addition: number[];
    subtraction: number[];
    multiplication: number[];
    division: number[];
}

export enum StartType {
    Restart = "restart",
    Redo = "redo",
    New = "new",
}

export type DataProps = {
    totalQuestions: number;
    questionsCorrect: number;
    timePerQuestion: number[];
    questionHistory: string[];
    answerHistory: number[];
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