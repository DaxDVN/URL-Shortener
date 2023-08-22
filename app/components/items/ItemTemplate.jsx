import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function ItemTemplate({ id, short, long, create_at }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <article className="url-item">
      <div>
        <a href={long} className="url-short">
          {short}
        </a>
        <p className="url-long">{long}</p>
        <span className="url-create-at">{create_at.slice(0, 10)}</span>
      </div>
      <menu className="url-actions">
        <CopyToClipboard text={short} onCopy={() => setCopied(true)}>
          <button className={copied ? "copied" : ""}>Copy to clipboard</button>
        </CopyToClipboard>
        <Form method="DELETE">
          <input name="id" value={id} hidden></input>
          <button>Delete</button>
        </Form>
      </menu>
    </article>
  );
}

export default ItemTemplate;
