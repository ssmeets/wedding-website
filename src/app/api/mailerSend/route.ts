// File: src/app/api/mailerSend/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
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

    const response = await axios.post("https://api.mailersend.com/v1/email", body, config);

    return NextResponse.json({ status_message: "ok" }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ status_message: "error" }, { status: 500 });
  }
}
