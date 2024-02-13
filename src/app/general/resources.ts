import { Message, NumericAttribute, Operator } from "@/app/general/interfaces";
import { sender, typeOfQuestion } from "@/app/general/types";

export const botMessages: Message[] = [
    {
        id: 0,
        text: `Hello! I'm a ChatBot that will help you to get small pieces of data 
from a large dataset called the English Lexicon Project. 
The English Lexicon Project contains a large number of words 
with many of their properties, and summaries of behavioral data 
from experiments that examined how easy or difficult to read these words are. 
My main purpose as a ChatBot is to help you get data based on specific properties of words.
For example, you may be interested in looking specifically at very long or very short words, 
or to look at words that are acquired early or late in childhood.
 At the moment, I have the capacity of helping you extract data based on three word properties:
1: Age of Acquisition
2: Number of Phonemes
3: Number of Syllables.
Which property would you like to start with?`,
        sender: "bot",
        typeOfQuestion: "parameter",
        answerOptions: [1, 2, 3],
    },
    {
        id: 1,
        text: `To help you get the words you desire, 
I need to know few things about your specific 
requirments to the property you have chosen above.
First I need to know if you want the words to be greater, lower or equal to a specific value.
Then I need to know the value of this property you want to start with.
For example, if you chose the property "age of aquisition" 
and you want words that aquiered at the age of 5 or less,
you will choose the "Lower" in this question, and then the value 5 in the next question.
So, Do you want the words to be greater, lower or equal to a specific value?
1. Greater
2. Lower
3. Equal`,
        sender: "bot",
        typeOfQuestion: "operator",
        answerOptions: [1, 2, 3],
    },
    {
        id: 2,
        text: `Now I need to know the value of this parameter you want to start with.
What would you like the value of this property to be?`,
        sender: "bot",
        typeOfQuestion: "value",
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
