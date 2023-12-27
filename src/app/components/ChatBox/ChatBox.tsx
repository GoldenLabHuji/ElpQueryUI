"use client";
import { useState, ChangeEvent } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    SendIcon,
} from "@/app/general/muiComponents";
import { styles } from "@/app/components/ChatBox/ChatBox.style";

export default function ChatBox() {
    const [input, setInput] = useState<string>("");

    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            setInput("");
        }
    };
    return (
        <Box sx={styles.box}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Type a message"
                        variant="outlined"
                        value={input}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setInput(event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSend}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
