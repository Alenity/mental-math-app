export function QGen({props} : {props: Props}) {
    let x, y;
    x = (Math.floor(Math.random()*Math.pow(10, props.digit_count)));
    y = (Math.floor(Math.random()*Math.pow(10, props.digit_count)));

    switch (props.operation) {
        case Operator.Add:
            return [(x + " + " + y), (x + y)];
        case Operator.Subtract: 
            return [(x + " - " + y), (x - y)];
        case Operator.Divide:
            return [(x + " / " + y), (x / y)];
        case Operator.Multiply:
            return [(x + " x " + y), (x * y)]
    }
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