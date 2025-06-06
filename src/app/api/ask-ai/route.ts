import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //read the prompt from the request body
  const { prompt } = await req.json();

  //call OpenAI API and send the PROMPT with it
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  console.log(process.env.OPENAI_API_KEY);
  const data = await response.json();
  return NextResponse.json(data);
}