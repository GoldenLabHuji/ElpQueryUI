import { sender, typeOfQuestion } from "@/app/general/types";

export interface Message {
    id: string | number;
    text: string;
    sender: sender;
    typeOfQuestion: typeOfQuestion;
    answerOptions?: number[];
}

export interface MessageSection {
    id: number | string;
    messageSection: Message[];
}

export interface MessageProps {
    message: Message;
}

export enum Operator {
    Greater = "Greater",
    Lower = "Lower",
    Equal = "Equal",
}

export interface NumericAttribute {
    value: number;
    operator: Operator;
}

export interface StringAttribute {
    value: string;
}

export interface QueryWords {
    age_of_aquisition: NumericAttribute | null;
    number_of_phon: NumericAttribute | null;
    number_of_syll: NumericAttribute | null;
    start_with: StringAttribute | null;
    sound_like: StringAttribute | null;
}
export interface TableProps {
    rows: WordData[];
}

export interface ResultsData {
    data: WordData[];
}

export interface WordData {
    Word: string | null;
    Length: number | null;
    SUBTLWF: number | null;
    Ortho_N: number | null;
    Phono_N: number | null;
    Concreteness_Rating: number | null;
    Age_Of_Acquisition: number | null;
    BG_Mean: string | null;
    Pron: string | null;
    n_Phon: number | null;
    n_Syll: number | null;
    n_Morph: number | null;
    I_NMG_Mean_RT: string | null;
    I_NMG_Mean_Accuracy: number | null;
}
