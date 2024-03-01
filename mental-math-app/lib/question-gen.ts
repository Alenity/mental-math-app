export function QGen({props} : {props: Props}) {
    let question = "";
    let answer = 0;
    switch (props.operation) {
        case Operator.Add:
            question = (Math.floor(Math.random()*Math.pow(10, props.digit_count))) + " + " + (Math.floor(Math.random()*Math.pow(10, props.digit_count)));
            break;
        case Operator.Subtract: 
            question = (Math.floor(Math.random()*Math.pow(10, props.digit_count))) + " - " + (Math.floor(Math.random()*Math.pow(10, props.digit_count)));
            break;
        case Operator.Divide:
            question = (Math.floor(Math.random()*Math.pow(10, props.digit_count))) + " / " + (Math.floor(Math.random()*Math.pow(10, props.digit_count)));
            break;
        case Operator.Multiply:
            question = (Math.floor(Math.random()*Math.pow(10, props.digit_count))) + " x " + (Math.floor(Math.random()*Math.pow(10, props.digit_count)));
            break;
    }
    return [question, answer];
}

export type Props = {
    operation: Operator;
    digit_count: number;
}

export enum Operator {
    Add = "+",
    Subtract = "-",
    Divide = "/",
    Multiply = "*",
}