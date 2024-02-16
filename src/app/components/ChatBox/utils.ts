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
import { botMessages, emptyNumericAttribute } from "@/app/general/resources";

export const handleUserInput = (
    input: string,
    currentMessagesSection: Message[],
    setCurrentMessagesSection: (messages: Message[]) => void,
    setCurrentQuestionIndex: (index: number) => void,
    setIsEndChat: (isEndChat: boolean) => void,
    currentQuestionIndex: number,
    setIsEndSection: (isEndSection: boolean) => void,
    setIsSubmit: (isSubmit: boolean) => void,
    isSubmit: boolean
) => {
    const lastQuestionIndex = botMessages.length - 1;
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
        setCurrentQuestionIndex(
            currentQuestionIndex < lastQuestionIndex
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

export const handleEndChat = (messages: MessageSection[]): QueryWords => {
    const wordsParams: QueryWords = {
        age_of_aquisition: null,
        number_of_phon: null,
        number_of_syll: null,
        start_with: null,
        sound_like: null
    };

    messages.forEach((msgSec) => {
        const userFilteredMessages = msgSec?.messageSection.filter(
            (msg) => msg?.sender === "user"
        );

        const numericAttribute: NumericAttribute = {
            ...emptyNumericAttribute,
        };

        userFilteredMessages?.forEach((msg) => {
            switch (msg?.typeOfQuestion) {
                case "value":
                    numericAttribute.value = Number(msg?.text);
                    break;
                case "operator":
                    numericAttribute.operator = [
                        Operator.Greater,
                        Operator.Lower,
                        Operator.Equal,
                    ][Number(msg?.text) - 1];
                    break;
                case "parameter":
                    wordsParams[
                        [
                            "age_of_aquisition",
                            "number_of_phon",
                            "number_of_syll",
                        ][Number(msg?.text) - 1] as keyof QueryWords
                    ] = numericAttribute as NumericAttribute & StringAttribute;
                    break;
                default:
                    break;
            }
        });
    });

    return wordsParams;
};
