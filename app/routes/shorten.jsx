import InputShortenUrl from "../components/shortener/InputShortenUrl";
import LinkResult from "../components/shortener/LinkResult";
import BackgroundAnimate from "../components/dashboard/BackgroundAnimate";
import shorten_style from "../style/shorten_style.css";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { generateObject } from "../libs/url-generate-object";
import ItemList from "../components/items/ItemList";
import { useState } from "react";
import { urlValidation } from "../libs/url-validation";
import { json, redirect } from "@remix-run/node";
import { supabaseClient } from "../libs/db.server";
import { getSession, commitSession, destroySession } from "../libs/auth.server";
export default function Shorten() {
  const [input, setInput] = useState("");

  let shorten_key = "";
  const actionData = useActionData();
  if (typeof actionData === "string") {
    shorten_key = actionData;
  }
  let listUrl = [];
  let domain = "";
  const data_domain = useLoaderData();
  if (data_domain != null) {
    listUrl = data_domain.data != null ? data_domain.data : [];
    domain = data_domain.domain;
  }
  return (
    <div className="container">
      <div>
        <Form method="POST">
          <input type="text" name="mod" value="signout" hidden />
          <button>Sign out</button>
        </Form>
        <InputShortenUrl input={input} setInput={setInput} />
        <BackgroundAnimate />
        <LinkResult shorten_key={shorten_key} domain={domain} />
      </div>
      <div>
        <ItemList listUrl={listUrl} domain={domain} />
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.get("userId") == null || session.get("userId") == undefined) {
    return redirect("/");
  }
  const uid = session.get("userId");
  const { data } = await supabaseClient.from("url").select();

  const form = await request.formData();
  const urlData = Object.fromEntries(form);

  if (request.method === "POST") {
    if (urlData.mod == "signout") {
      return redirect("/", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    const { data, error } = await supabaseClient
      .from("url")
      .select()
      .eq("userId", uid);
    if (data.length == process.env.MAX_URL) {
      return "maxURL";
    }
    const long = urlData.long;
    const validate = await urlValidation(long);
    if (validate == false) {
      return "Please enter a valid URL";
    }
    const url = generateObject(long, uid);
    await supabaseClient.from("url").insert(url);
    return url.short;
  }

  if (request.method === "DELETE") {
    const id = urlData.id;
    try {
      return await supabaseClient.from("url").delete().eq("id", id);
    } catch (error) {
      return null;
    }
  }

  return json({ data });
};

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.get("userId") == null || session.get("userId") == undefined) {
    return redirect("/");
  }
  const uid = session.get("userId");
  const data_domain_uid = {
    data: null,
    domain: process.env.DOMAIN_NAME,
    uid: uid,
  };
  try {
    const { data } = await supabaseClient
      .from("url")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("userId", uid);
    data_domain_uid.data = data;
    return data_domain_uid;
  } catch (error) {
    return data_domain_uid;
  }
};

export const links = () => [{ rel: "stylesheet", href: shorten_style }];
