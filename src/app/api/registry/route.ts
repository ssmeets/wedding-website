// File: src/app/api/mailerSend/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import emailData from "./email.json";
import { PostRegistryData } from "@/slices/Registry/GiftCard";

export async function POST(request: NextRequest) {
  let body: PostRegistryData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
    };

    const data = {
      ...emailData,
      to: [{ email: body.email, name: body.name }],
      html: emailData.html.replace("{{name}}", body.name),
      attachments: [
        {
          disposition: "attachment",
          filename: "gift_card.pdf",
          content: body.pdf,
        },
      ],
    };

    // console.log("Sending this base64 encoded pdf as attachment:", body.pdf);
    const response = await axios.post("https://api.mailersend.com/v1/email", data, config);

    return NextResponse.json({ status_message: "ok" }, { status: response.status });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ status_message: "error" }, { status: 500 });
  }
}
