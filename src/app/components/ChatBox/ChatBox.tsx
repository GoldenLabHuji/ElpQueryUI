"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styles } from "@/app/components/ChatBox/ChatBox.style";
import ChatInput from "@/app/components/ChatInput";
import ChatButton from "@/app/components/ChatButton";
import { sender, typeOfQuestion } from "@/app/general/types";
import { useRecoilState } from "recoil";
import {
    Message,
    MessageSection,
    QueryWords,
    Operator,
    NumericAttribute,
} from "@/app/general/interfaces";
import { messagesSectionAtom } from "@/app/store/atoms";
import { botMessages, emptyNumericAttribute } from "@/app/general/resources";

export default function ChatBox() {
    const [messages, setMessages] = useRecoilState(messagesSectionAtom);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [currentMessagesSection, setCurrentMessagesSection] = useState<
        Message[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isEndSection, setIsEndSection] = useState<boolean>(false);
    const [isEndChat, setIsEndChat] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const input = data.get("input")?.toString() || "";
        const lastQuestionIndex = botMessages.length - 1;
        const lastMessageSectionQuestion =
            currentMessagesSection[currentMessagesSection.length - 1];
        const typeOfQuestion =
            currentMessagesSection.length > 0
                ? lastMessageSectionQuestion.typeOfQuestion
                : "";

        if (
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

        if (input !== "") {
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
        e.currentTarget.reset();
    };

    useEffect(() => {
        if (!isEndChat) {
            setCurrentMessagesSection([
                ...currentMessagesSection,
                botMessages[currentQuestionIndex],
            ]);
        }
    }, [currentQuestionIndex, isEndChat]);

    useEffect(() => {
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
    }, [currentMessagesSection, isSubmit, isEndSection]);

    useEffect(() => {
        if (isEndChat) {
            const wordsParams: QueryWords = {
                ageOfAquisition: null,
                numberOfPhon: null,
                numberOfSyll: null,
            };
            messages.map((msgSec) => {
                const userFiilteredMessages = msgSec?.messageSection.filter(
                    (msg) => msg?.sender === "user"
                );
                let numericAttribute: NumericAttribute = {
                    ...emptyNumericAttribute,
                };
                userFiilteredMessages?.map((msg) => {
                    switch (msg?.typeOfQuestion) {
                        case "value":
                            numericAttribute.value = Number(msg?.text);
                            break;
                        case "operator":
                            switch (Number(msg?.text)) {
                                case 1:
                                    numericAttribute.operator =
                                        Operator.Greater;
                                    break;
                                case 2:
                                    numericAttribute.operator = Operator.Lower;
                                    break;
                                case 3:
                                    numericAttribute.operator = Operator.Equal;
                                    break;
                            }
                            break;
                        case "std":
                            numericAttribute.std = Number(msg?.text);
                            break;
                        case "parameter":
                            switch (Number(msg?.text)) {
                                case 1:
                                    wordsParams.ageOfAquisition =
                                        numericAttribute;
                                    break;
                                case 2:
                                    wordsParams.numberOfPhon = numericAttribute;
                                    break;
                                case 3:
                                    wordsParams.numberOfSyll = numericAttribute;
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                });
            });
            console.log(wordsParams);
        }
    }, [isEndChat]);

    return (
        <Box sx={styles.box}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <ChatInput />
                    <ChatButton />
                </Grid>
            </Box>
        </Box>
    );
}
