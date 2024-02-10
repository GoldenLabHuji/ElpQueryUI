import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatButton() {
    return (
        <Grid item xs={2}>
            <Button
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
            >
                Send
            </Button>
        </Grid>
    );
}
