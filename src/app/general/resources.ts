import { Message, NumericAttribute, Operator } from "@/app/general/interfaces";
import { sender, typeOfQuestion } from "@/app/general/types";

export const botMessages: Message[] = [
    {
        id: 0,
        text: `What parameter would you like add to you query?
1. age of aquisition
2. number of phon
3. number of syll`,
        sender: "bot",
        typeOfQuestion: "parameter",
        answerOptions: [1, 2, 3],
    },
    {
        id: 1,
        text: "What is the value of this parameter?",
        sender: "bot",
        typeOfQuestion: "value",
    },
    {
        id: 2,
        text: `Do you want the query words to be:
1. Greater then this value 
2. Lower then this value
3. Equal to this value`,
        sender: "bot",
        typeOfQuestion: "operator",
        answerOptions: [1, 2, 3],
    },
    {
        id: 3,
        text: "What would you like the std of this parameter to be?",
        sender: "bot",
        typeOfQuestion: "std",
    },
    {
        id: 4,
        text: `Do you want to add more parameter?
1. Yes
2. No`,
        sender: "bot",
        typeOfQuestion: "add",
        answerOptions: [1, 2],
    },
];

export const emptyNumericAttribute: NumericAttribute = {
    value: 0,
    operator: Operator.Greater,
    std: 0,
};

export const resultMsg = {
    id: "resultMsg",
    text: `Here is the results of your query. 
You can download the results as a csv file`,
    sender: "bot" as sender,
    typeOfQuestion: "result" as typeOfQuestion,
};

export const tableHeaders = [
    "Word",
    "Length",
    "SUBTLWF",
    "Ortho_N",
    "Phono_N",
    "Concreteness_Rating",
    "Age_Of_Acquisition",
    "BG_Mean",
    "Pron",
    "NPhon",
    "NSyll",
    "NMorph",
    "I_NM_Mean _RT",
    "I NMG Mean Accuracy",
];
