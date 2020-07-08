import React, { useState } from "react";
import RichTextEditor from "react-rte";

const MyStatefulEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  function handleChange(value) {
    setValue(value);

    if (onChange) {
      onChange(value.toString("html"));
    }
  }

  return (
    <div>
      <RichTextEditor value={value} onChange={handleChange} />
      <br />
      <br />
      <br />
      <textarea
        className="textarea"
        value={value.toString("markdown")}
      ></textarea>
    </div>
  );
};

export default MyStatefulEditor;
