import Image from "next/image";
import OpenAI from "openai";

export default function Home() {
  const openai = new OpenAI();
  const chatgpt = async () => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Write a haiku about recursion in programming.",
        },
      ],
    });
    console.log(completion.choices[0].message);
  };

  // Call the chatgpt function
  chatgpt();

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}
