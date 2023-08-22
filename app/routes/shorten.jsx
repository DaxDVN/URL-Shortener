import InputShortenUrl from "../components/shortener/InputShortenUrl";
import LinkResult from "../components/shortener/LinkResult";
import BackgroundAnimate from "../components/dashboard/BackgroundAnimate";
import shorten_style from "../style/shorten_style.css";
import { addUrl, deleteUrl, readUrl } from "../services/url.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { generateObject } from "../libs/url-generate-object";
import ItemList from "../components/items/ItemList";
import { useState } from "react";
import { urlValidation } from "../libs/url-validation";
export default function Shorten() {
  const [input, setInput] = useState("");

  let shorten_key = "Your link will be here!";
  const urlData = useActionData();
  if (urlData != null && urlData != undefined) {
    shorten_key = urlData.short;
  }

  const listUrl = useLoaderData();
  return (
    <div className="container">
      <div>
        <InputShortenUrl input={input} setInput={setInput} />
        <BackgroundAnimate />
        <LinkResult shorten_key={shorten_key} />
      </div>
      <div>
        <ItemList listUrl={listUrl} />
      </div>
    </div>
  );
}

export async function action({ params, request }) {
  const formData = await request.formData();
  const urlData = Object.fromEntries(formData);
  if (request.method === "POST") {
    const validate = await urlValidation(urlData.long);

    if (validate == false) {
      return "Please enter a valid URL";
    }
    const url = generateObject(urlData.long, 1);
    return await addUrl(url);
  }
  if (request.method === "DELETE") {
    await deleteUrl(+urlData.id);
    return null;
  }
  return urlData;
}

export async function loader({ request }) {
  if (request.method === "GET") {
    return await readUrl(1);
  }
  return null;
}

export const links = () => [{ rel: "stylesheet", href: shorten_style }];
