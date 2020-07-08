import React, { useState } from "react";
import RichTextEditor from "react-rte";

const MyStatefulEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  function handleChange(value) {
    let markdown = value.toString("markdown");
    handleRegex(markdown);
    setValue(value);

    if (onChange) {
      onChange(markdown);
    }
  }

  function handleRegex(markdown) {
    // let chapterRegex = /^-(.*)/gm;
    // let titleRegex = /( {4})-(.*)/gm;
    // let chapterArray = markdown.match(chapterRegex);
    // let titleArray = markdown.match(titleRegex);
    let test = markdown.match(/^-(.*)|( {4})-(.*)/gm);

    console.log(test);
  }

  return (
    <div>
      <RichTextEditor value={value} onChange={handleChange} />
      <br />
      <br />
      <br />
      <textarea
        name="textarea"
        className="textarea"
        value={value.toString("markdown")}
      />
    </div>
  );
};

export default MyStatefulEditor;
