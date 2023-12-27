import { Box } from "@/app/general/muiComponents";
import { messages } from "@/app/general/resources";
import Message from "@/app/components/Message/Message";
import ChatBox from "@/app/components/ChatBox";
import { styles } from "@/app/components/Chat/Chat.style";

export default function Chat() {
    return (
        <Box sx={styles.container}>
            <Box sx={styles.secondContainer}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </Box>
            <ChatBox />
        </Box>
    );
}
