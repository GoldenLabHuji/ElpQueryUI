"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styles } from "@/app/components/ChatBox/ChatBox.style";
import ChatInput from "@/app/components/ChatInput";
import ChatButton from "@/app/components/ChatButton";
import { sender, typeOfQuestion } from "@/app/general/types";
import { useRecoilState } from "recoil";
import { Message, MessageSection } from "@/app/general/interfaces";
import { messagesSectionAtom } from "@/app/store/atoms";
import { botMessages } from "@/app/general/resources";

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

        if (input !== "") {
            const typeOfQuestion =
                currentMessagesSection.length > 0
                    ? lastMessageSectionQuestion.typeOfQuestion
                    : "";

            const newMessage: Message = {
                id: currentMessagesSection.length,
                text: input,
                sender: "user" as sender,
                typeOfQuestion: typeOfQuestion as typeOfQuestion,
            };
            setCurrentMessagesSection([...currentMessagesSection, newMessage]);

            if (
                typeOfQuestion === "add" &&
                input.toLowerCase().includes("no")
            ) {
                setIsEndChat(true);
            }
        }
        setCurrentQuestionIndex(
            currentQuestionIndex < lastQuestionIndex
                ? currentQuestionIndex + 1
                : 0
        );
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
