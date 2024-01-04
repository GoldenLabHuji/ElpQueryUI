import { Avatar, Box, Paper, Typography } from "@mui/material";
import { styles } from "@/app/components/Message/Message.style";
import { MessageProps } from "@/app/general/interfaces";

export default function Message({ message }: MessageProps) {
    const isBot = message.sender === "bot";

    return (
        <Box
            sx={{
                ...styles.container,
                justifyContent: isBot ? "flex-start" : "flex-end",
            }}
        >
            <Box
                sx={{
                    ...styles.box,
                    flexDirection: isBot ? "row" : "row-reverse",
                }}
            >
                <Avatar
                    sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}
                >
                    {isBot ? "B" : "U"}
                </Avatar>
                <Paper
                    variant="outlined"
                    sx={isBot ? styles.paperBot : styles.paperUser}
                >
                    <Typography sx={styles.text} variant="body1">
                        {message.text}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
