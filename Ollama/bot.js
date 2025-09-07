import fetch from "node-fetch";

async function askOllama(prompt) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "human",
      messages: [
        {
          role: "system",
          content:
            "Reply was a very short message. Your creator is AlphaCode an embedded systems engineer and backend developer. you are kind. and dont send long messages.. make it as short and straight to the point as possible. very short. the use of emojis is allowed and can be used frequently. but the response must be short",
        },
        { role: "user", content: prompt },
      ],
    }),
  });
  console.log(response);

  let fullAnswer = "";

  for await (const chunk of response.body) {
    const lines = chunk.toString().trim().split("\n");
    for (const line of lines) {
      if (line) {
        const data = JSON.parse(line);
        if (data.messages?.content) {
          fullAnswer += data.messages.content;
          console.log(".");
        }
      }
    }
  }

  console.log("Full answer: ", fullAnswer.trim());
}

askOllama("hi");
