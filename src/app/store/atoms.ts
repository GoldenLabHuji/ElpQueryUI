"use client";
import { atom, RecoilState } from "recoil";
import { MessageSection } from "@/app/general/interfaces";

export const messagesSectionAtom: RecoilState<MessageSection[]> = atom({
    key: "messages",
    default: [
        {
            id: 0,
            messageSection: [
                {
                    id: 0,
                    text: "What parameter would you like add to you query?",
                    sender: "bot",
                    typeOfQuestion: "parameter",
                },
            ],
        },
    ] as MessageSection[],
});
