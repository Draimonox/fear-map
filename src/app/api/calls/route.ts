import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { city } = await request.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Write a scary story that occurred in ${city}, make it as realistic as possible where I don't know it's just a fake story.`,
        },
      ],
    });

    console.log(completion.choices[0].message);
    return completion.choices[0].message;
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    return NextResponse.error();
  }
}

// const completion = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     { role: "system", content: "You are a helpful assistant." },
//     {
//       role: "user",
//       content: "Write a haiku about recursion in programming.",
//     },
//   ],
// });
