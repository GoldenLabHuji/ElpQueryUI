import { QueryWords } from "@/app/general/interfaces";

export async function POST(queryWords: QueryWords) {
    const url = process.env.api_url;
    try {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryWords),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
