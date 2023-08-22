import { useLoaderData } from "@remix-run/react";
import { findUrl } from "../services/url.server";
import BackgroundAnimate from "../components/dashboard/BackgroundAnimate";
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
    const urlData = await findUrl(params.key);
    return urlData.long;
  } catch (error) {}
  return null;
}
