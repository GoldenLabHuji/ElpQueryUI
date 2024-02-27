import { sender, typeOfQuestion } from "@/app/general/types";
import { SetterOrUpdater } from "recoil";
import {
    Message,
    MessageSection,
    QueryWords,
    Operator,
    NumericAttribute,
    StringAttribute,
} from "@/app/general/interfaces";
import {
    botMessages,
    botStringMessages,
    botNumericMessages,
    botOperatorMessages,
    botRangeOperatorMessages,
    emptyNumericAttribute,
    emptyStringAttribute,
} from "@/app/general/resources";
import { isNumberArray } from "@/app/general/utils";

export const handleUserInput = (
    input: string,
    currentMessagesSection: Message[],
    setCurrentMessagesSection: (messages: Message[]) => void,
    setCurrentQuestionIndex: (index: number) => void,
    setIsEndChat: (isEndChat: boolean) => void,
    currentQuestionIndex: number,
    setIsEndSection: (isEndSection: boolean) => void,
    setIsSubmit: (isSubmit: boolean) => void,
    lastQuestionIndex: number,
    setLastQuestionIndex: (lastQuestionIndex: number) => void,
    setIsStringParameter: (isStringParameter: boolean) => void,
    isStringParameter: boolean,
    isSubmit: boolean
) => {
    const lastMessageSectionQuestion =
        currentMessagesSection[currentMessagesSection.length - 1];
    const typeOfQuestion =
        currentMessagesSection.length > 0
            ? lastMessageSectionQuestion.typeOfQuestion
            : "";

    if (
        lastMessageSectionQuestion.answerOptions &&
        !lastMessageSectionQuestion.answerOptions?.includes(Number(input))
    ) {
        const newMessage: Message = {
            id: currentMessagesSection.length,
            text: "I don't understand, please enter a valid option",
            sender: "bot" as sender,
            typeOfQuestion: typeOfQuestion as typeOfQuestion,
            answerOptions: lastMessageSectionQuestion.answerOptions,
        };
        setCurrentMessagesSection([...currentMessagesSection, newMessage]);
    }

    if (
        (lastMessageSectionQuestion.answerOptions?.includes(Number(input)) ||
            !lastMessageSectionQuestion.answerOptions) &&
        input !== ""
    ) {
        const newMessage: Message = {
            id: currentMessagesSection.length,
            text: input,
            sender: "user" as sender,
            typeOfQuestion: typeOfQuestion as typeOfQuestion,
        };
        setCurrentMessagesSection([...currentMessagesSection, newMessage]);

        if (typeOfQuestion === "add" && Number(input) === 2) {
            setIsEndChat(true);
        }

        if (typeOfQuestion === "parameter") {
            if (Number(input) === 4) {
                setIsStringParameter(true);
                botMessages.push(...botStringMessages);
                setLastQuestionIndex(botMessages.length - 1);
                setIsEndSection(false);
            } else {
                setIsStringParameter(false);
                botMessages.push(...botNumericMessages);
                setLastQuestionIndex(botMessages.length - 1);
            }
        }

        if (!isStringParameter) {
            if (typeOfQuestion === "operator") {
                if (Number(input) === 4) {
                    botMessages.push(...botRangeOperatorMessages);
                    setLastQuestionIndex(botMessages.length - 1);
                } else {
                    botMessages.push(...botOperatorMessages);
                    setLastQuestionIndex(botMessages.length - 1);
                }
            }
        }

        setCurrentQuestionIndex(
            currentQuestionIndex < lastQuestionIndex + 1
                ? currentQuestionIndex + 1
                : 0
        );
    }

    setIsEndSection(currentQuestionIndex === lastQuestionIndex);
    setIsSubmit(!isSubmit);
};

export const updateMessagesSection = (
    currentQuestionIndex: number,
    currentMessagesSection: Message[],
    setCurrentMessagesSection: (messages: Message[]) => void,
    setIsEndSection: (isEndSection: boolean) => void,
    setMessages: SetterOrUpdater<MessageSection[]>,
    messages: MessageSection[],
    isEndSection: boolean,
    isEndChat: boolean
) => {
    const lastMessageIndex = messages.length - 1;
    const updatedMessages = [...messages];
    updatedMessages[lastMessageIndex] = {
        ...updatedMessages[lastMessageIndex],
        messageSection: currentMessagesSection,
    };

    setMessages((prevMessages) => {
        const newMessageSection: MessageSection = {
            id: prevMessages.length,
            messageSection: [...currentMessagesSection],
        };
        return isEndSection
            ? [...updatedMessages, newMessageSection]
            : updatedMessages;
    });
    if (isEndSection) {
        setCurrentMessagesSection(
            !isEndChat ? [botMessages[currentQuestionIndex]] : []
        );
    }

    setIsEndSection(false);
};

export const handleEndChat = (
    messages: MessageSection[],
    isStringParameter: boolean
): QueryWords => {
    const wordsParams: QueryWords = {
        age_of_aquisition: null,
        number_of_phon: null,
        number_of_syll: null,
        start_with: null,
        sound_like: null,
    };

    const numericAttribute: NumericAttribute = {
        ...emptyNumericAttribute,
    };
    const stringAttribute: StringAttribute = {
        ...emptyStringAttribute,
    };

    messages.forEach((msgSec) => {
        const userFilteredMessages = msgSec?.messageSection.filter(
            (msg) => msg && msg?.sender === "user"
        );

        userFilteredMessages?.forEach((msg) => {
            switch (msg?.typeOfQuestion) {
                case "value":
                    if (!isStringParameter) {
                        if (numericAttribute.operator === Operator.Range) {
                            if (isNumberArray(numericAttribute.value)) {
                                numericAttribute.value.push(Number(msg?.text));
                            }
                        } else {
                            numericAttribute.value = Number(msg?.text);
                        }
                    } else {
                        stringAttribute.value = msg?.text;
                    }
                    break;
                case "operator":
                    if (!isStringParameter) {
                        numericAttribute.operator = [
                            Operator.Greater,
                            Operator.Lower,
                            Operator.Equal,
                            Operator.Range,
                        ][Number(msg?.text) - 1];
                        if (Number(msg?.text) === 4) {
                            numericAttribute.value = [] as number[];
                        }
                    } else {
                        wordsParams[
                            ["start_with", "sound_like"][
                                Number(msg?.text) - 1
                            ] as keyof QueryWords
                        ] = stringAttribute as StringAttribute &
                            NumericAttribute;
                    }
                    break;
                case "parameter":
                    if (!isStringParameter) {
                        wordsParams[
                            [
                                "age_of_aquisition",
                                "number_of_phon",
                                "number_of_syll",
                            ][Number(msg?.text) - 1] as keyof QueryWords
                        ] = numericAttribute as NumericAttribute &
                            StringAttribute;
                    }
                    break;
                default:
                    break;
            }
        });
    });

    return wordsParams;
};
