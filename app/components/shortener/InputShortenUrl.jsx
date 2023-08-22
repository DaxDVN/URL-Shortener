import React, { useState } from "react";
import { Form } from "@remix-run/react";

const InputShortenUrl = ({ input, setInput }) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    setValue("");
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div>
        <Form method="post" className="form" id="url-form">
          <input
            type="text"
            placeholder="Paste a link to shorten it"
            value={value}
            onChange={(e) => {
              setInput(e.target.value);
              setValue(e.target.value);
            }}
          />

          <input type="text" name="long" value={input} hidden />

          <button onClick={handleClick}>shorten</button>
        </Form>
      </div>
    </div>
  );
};

export default InputShortenUrl;
