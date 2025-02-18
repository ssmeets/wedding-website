// File: src/app/api/mailerSend/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import emailData from "./email.json";
import { PostRegistryData } from "@/slices/Registry/GiftCard";

export interface EmailData {
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  subject: string;
  text: string;
  html: string;
  attachments: {
    disposition: string;
    filename: string;
    id?: string;
    content: string;
  }[];
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = (await request.json()) as PostRegistryData;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  //   console.log(body);
  //   console.log("=====");
  //   console.log(JSON.stringify(body));

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
    };

    let data: EmailData = emailData;

    data.to = [];
    data.to.push({ email: body.email, name: body.name });
    data.html = data.html.replace("{{name}}", body.name);
    data.attachments.push({ disposition: "attachment", filename: "gift_card.pdf", content: body.pdf });

    const response = await axios.post("https://api.mailersend.com/v1/email", data, config);

    return NextResponse.json({ status_message: "ok" }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ status_message: "error" }, { status: 500 });
  }
}
