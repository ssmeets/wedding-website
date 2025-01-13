import { createClient } from "@/prismicio";
import { createLocaleRedirect } from "@prismicio/next";

export async function middleware(request) {
  const client = createClient();
  const redirect = await createLocaleRedirect({ client, request });
  console.log("MIIDLEWARE", redirect);
  if (redirect) {
    return redirect;
  }
}

export const config = {
  // Do not localize these paths
  matcher: ["/((?!_next|api|slice-simulator|icon.svg|icon.png).*)"],
};
