import { useState } from "react";

export default function TakeExam() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `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`, // ⚠️ Not safe in production
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // or gpt-4o, gpt-3.5-turbo
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await res.json();
      const botMsg = { sender: "bot", text: data.choices[0].message.content };
      setMessages((prev) => [...prev, userMsg, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto border-b mb-2 p-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block p-2 m-1 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
