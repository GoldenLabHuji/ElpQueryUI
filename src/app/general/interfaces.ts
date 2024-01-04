import { sender, typeOfQuestion } from "@/app/general/types";

export interface Message {
    id: number;
    text: string;
    sender: sender;
    typeOfQuestion: typeOfQuestion;
}

export interface MessageSection {
    id: number;
    messageSection: Message[];
}

export interface MessageProps {
    message: Message;
}
