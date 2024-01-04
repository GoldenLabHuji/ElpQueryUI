"use client";
import { Box } from "@mui/material";
import Message from "@/app/components/Message/Message";
import ChatBox from "@/app/components/ChatBox";
import { styles } from "@/app/components/Chat/Chat.style";
import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";

export default function Chat() {
    const [messagesSection, _] = useRecoilState(messagesSectionAtom);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.secondContainer}>
                {messagesSection && messagesSection.length > 0
                    ? messagesSection.map((msgSection) =>
                          msgSection?.messageSection &&
                          msgSection?.messageSection.length > 0
                              ? msgSection?.messageSection.map(
                                    (message, index) => (
                                        <Message
                                            key={index}
                                            message={message}
                                        />
                                    )
                                )
                              : []
                      )
                    : []}
            </Box>
            <ChatBox />
        </Box>
    );
}
