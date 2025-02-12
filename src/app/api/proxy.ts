import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, headers, body } = req;

  try {
    // Forward the request to the target API (e.g., MailerSend)
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method,
      headers: {
        "Content-Type": "application/json",
        //Authorization: headers.authorization || `Bearer ${process.env.MAILERSEND_API_KEY}`,
        Authorization: headers.authorization || `Bearer mlsn.02158673b1f0c9a9c6b30147a87ca19687026e6f6520f0af14c16585a94d14cd`,
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
