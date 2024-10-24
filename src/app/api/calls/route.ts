import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST", // Corrected the method to POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Updated model (use the one you need)
        prompt: `Write a scary story that occurred in ${city}.`, // Example prompt
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    return NextResponse.error();
  }
}
