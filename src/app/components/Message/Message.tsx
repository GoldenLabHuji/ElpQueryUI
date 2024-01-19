import { Avatar, Box, Paper, Typography } from "@mui/material";
import { styles } from "@/app/components/Message/Message.style";
import { MessageProps } from "@/app/general/interfaces";

export default function Message({ message }: MessageProps) {
    const isBot = message.sender === "bot";

    return (
        <Box sx={isBot ? styles.container.bot : styles.container.user}>
            <Box sx={isBot ? styles.box.bot : styles.box.user}>
                <Avatar sx={isBot ? styles.avatar.bot : styles.avatar.user}>
                    {isBot ? "B" : "U"}
                </Avatar>
                <Paper
                    variant="outlined"
                    sx={isBot ? styles.paper.bot : styles.paper.user}
                >
                    <Typography sx={styles.text} variant="body1">
                        {message.text}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
