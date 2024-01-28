import { sender, typeOfQuestion } from "@/app/general/types";

export interface Message {
    id: number;
    text: string;
    sender: sender;
    typeOfQuestion: typeOfQuestion;
    answerOptions?: number[];
}

export interface MessageSection {
    id: number;
    messageSection: Message[];
}

export interface MessageProps {
    message: Message;
}

export enum Operator {
    Greater = 1,
    Lower,
    Equal,
}

export interface NumericAttribute {
    value: number;
    operator: Operator;
    std: number;
}

export interface QueryWords {
    ageOfAquisition: NumericAttribute | null;
    numberOfPhon: NumericAttribute | null;
    numberOfSyll: NumericAttribute | null;
}
