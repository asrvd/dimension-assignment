import { OpenAI } from "openai";
import { type NextRequest } from "next/server";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY not set");
}

const o = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const labels = [
  "bug",
  "feature",
  "improvement",
  "documentation",
  "duplicate",
  "web",
  "cloud",
  "performance",
];

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");

  if (!text) {
    return new Response("Missing text", { status: 400 });
  }

  const prompt = `Assign labels to the given piece of text:\n\n${text}\n\nLabels: ${labels.join(
    ", "
  )}\n\nOutput should be in the format: label1, label2, label3\n\nIf no labels are applicable, return "empty".`;

  try {
    const response = await o.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      n: 1,
    });

    const recommendedLabels = response.choices[0].message.content?.split(", ");

    if (!recommendedLabels || recommendedLabels.includes("empty")) {
      return new Response(JSON.stringify([]));
    }

    return new Response(JSON.stringify(recommendedLabels), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify([]));
  }
}
