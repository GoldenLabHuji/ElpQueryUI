import { Message } from "@/app/general/interfaces";

export const botMessages: Message[] = [
    {
        id: 0,
        text: "What parameter would you like add to you query?",
        sender: "bot",
        typeOfQuestion: "parameter",
    },
    {
        id: 1,
        text: "What is the value of this parameter?",
        sender: "bot",
        typeOfQuestion: "value",
    },
    {
        id: 2,
        text: "Do you want the query words to be greater, lower or equal to this value?",
        sender: "bot",
        typeOfQuestion: "operator",
    },
    {
        id: 3,
        text: "What would you like the std of this parameter to be?",
        sender: "bot",
        typeOfQuestion: "std",
    },
    {
        id: 4,
        text: "Do you want to add more parameter?",
        sender: "bot",
        typeOfQuestion: "add",
    },
];
