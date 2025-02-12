import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, headers, body } = req;

  try {
    // Forward the request to the target API (e.g., MailerSend)
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: headers.authorization || `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Send the response back to the client
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}
