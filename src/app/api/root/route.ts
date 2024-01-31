import { QueryWords, Operator } from "@/app/general/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const url = process.env.api_url;
    const wordsLimit = 10;
    const wordsParams: QueryWords = await request.json();

    const response = await fetch(`${url}/${wordsLimit}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            age_of_aquisition: wordsParams.age_of_aquisition,
            number_of_phon: wordsParams.number_of_phon,
            number_of_syll: wordsParams.number_of_syll,
        }),
    });

    const data = await response.json();

    return NextResponse.json({ data });
}
