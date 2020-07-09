import React, { useState } from "react";
import RichTextEditor from "react-rte";

const MyStatefulEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  function handleChange(value) {
    let markdown = value.toString("html");
    handleRegex(markdown);
    setValue(value);

    if (onChange) {
      onChange(markdown);
    }
  }

  function handleRegex(markdown) {
    let test = markdown
      .replace(/(^ {2}<li>)/gm, "parent - ")
      .replace(/(^ {6}<li>)/gm, "direct child - ")
      .replace(/(^ {10}<li>)/gm, "children - ");

    // let parentArray = test.match(/^parent -.*/gm);
    // let directChildArray = test.match(/^direct child -.*/gm);
    // let childrenArray = test.match(/^children -.*/gm);
    // let parsed = [];

    let testArray = test.split(">");

    let filteredArray = testArray.filter(
      (each) =>
        each.includes("parent") ||
        each.includes("direct child") ||
        each.includes("children")
    );
    // .map((each) =>
    //   each
    //     .replace(/([\w ]+ - )/g, "")
    //     .replace(/(\s)*<\/?\w{2}?/g, "")
    //     .trim()
    // );

    console.log(filteredArray);
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
        value={value.toString("html")}
      />
    </div>
  );
};

export default MyStatefulEditor;
