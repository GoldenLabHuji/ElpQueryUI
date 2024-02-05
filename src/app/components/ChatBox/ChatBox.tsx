"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styles } from "@/app/components/ChatBox/ChatBox.style";
import ChatInput from "@/app/components/ChatInput";
import ChatButton from "@/app/components/ChatButton";
import { useRecoilState } from "recoil";
import { Message } from "@/app/general/interfaces";
import {
    messagesSectionAtom,
    queryParamsAtom,
    isQuerySubmitAtom,
} from "@/app/store/atoms";
import { botMessages } from "@/app/general/resources";
import {
    handleUserInput,
    updateMessagesSection,
    handleEndChat,
} from "@/app/components/ChatBox/utils";

export default function ChatBox() {
    const [messages, setMessages] = useRecoilState(messagesSectionAtom);
    const [isQuerySubmit, setIsQuerySubmit] = useRecoilState(isQuerySubmitAtom);
    const [_, setQueryParams] = useRecoilState(queryParamsAtom);
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

        handleUserInput(
            input,
            currentMessagesSection,
            setCurrentMessagesSection,
            setCurrentQuestionIndex,
            setIsEndChat,
            currentQuestionIndex,
            setIsEndSection,
            setIsSubmit,
            isSubmit
        );

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
        if (isEndChat) {
            setQueryParams(handleEndChat(messages));
            setIsQuerySubmit(true);
        }
    }, [isEndChat]);

    useEffect(() => {
        updateMessagesSection(
            currentQuestionIndex,
            currentMessagesSection,
            setCurrentMessagesSection,
            setIsEndSection,
            setMessages,
            messages,
            isEndSection,
            isEndChat
        );
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
