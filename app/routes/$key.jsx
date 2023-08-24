import { useLoaderData } from "@remix-run/react";
import BackgroundAnimate from "../components/dashboard/BackgroundAnimate";
import { supabaseClient } from "../libs/db.server";
import { redirect } from "@remix-run/node";
export default function RenderLink() {
  try {
    const urlData = useLoaderData();
    if (urlData != null && urlData != undefined && urlData != "") {
      window.location.replace(urlData);
      return (
        <div>
          <BackgroundAnimate />
        </div>
      );
    } else {
      return <h1>something went wrong</h1>;
    }
  } catch (error) {}
}

export async function loader({ params }) {
  try {
    const { data } = await supabaseClient
      .from("url")
      .select()
      .eq("short", params.key);
    const link = data[0].long;
    return redirect(link);
  } catch (error) {}
  return null;
}
