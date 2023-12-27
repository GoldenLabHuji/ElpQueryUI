export interface Message {
    id: number;
    text: string;
    sender: string;
}

export interface MessageProps {
    message: Message;
}