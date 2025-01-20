import OpenAI from "openai";
import { createDataStream, createDataStreamResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 100,
      });

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.error("Error fetching from AstraDB:", err);
      docContext = "";
    }

    const template = {
      role: "system",
      content: `
    You are an AI Assistant that knows everything about Formula One. Use the below context to augment what you know about Formula One racing. The context will provide you with the most recent page from Wikipedia, the official F1 website and a couple other pages.
    If the context doesn't include the information you need to answer based on your existing knowledge and don't the source of your information or what the context does or doesn't include. 
    Format the responses using markdown where applicable and do not return images.
    --------
    START CONTEXT
    ${docContext}
    END CONTEXT
    --------
    QUESTION: ${latestMessage}
    `,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [template, ...messages],
    });

    const stream = createDataStream({
      async execute(dataStream) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          console.log(content);
          if (content) {
            dataStream.writeData({ content });
          }
        }
      },
      onError: (error) => `An error occurred while streaming`,
    });

    return createDataStreamResponse({
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      async execute(dataStream) {
        dataStream.merge(stream);
      },
      onError: (error) => `Error in response stream ${error}`,
    });
  } catch (err) {
    throw err;
  }
}
