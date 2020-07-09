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
    debugger;
    let dataArray = markdown
      .replace(/(^ {2}<li>)/gm, "parent - ") // identifying what type of text it is
      .replace(/(^ {6}<li>)/gm, "direct child - ")
      .replace(/(^ {10}<li>)/gm, "children - ")
      .split(">") // making all of the string an array
      .filter(
        // filtering array so we can work on only the text we need
        (each) =>
          each.includes("parent") ||
          each.includes("direct child") ||
          each.includes("children")
      )
      .map((each) => each.replace(/(\s)*<\/?\w{2}?/g, "").trim()); // mapping to remove unnecessary space and symbols

    let parsedData = [];

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].includes("parent")) {
        let data = {};
        data.parent = dataArray[i];

        for (let j = i + 1; j < dataArray.length; j++) {
          data.direct_children = [];

          if (dataArray[j].includes("direct child")) {
            let childData = { name: dataArray[j] };

            data.direct_children.push(childData);
            // console.log(data);
            for (let k = j + 1; k < dataArray.length; k++) {
              if (dataArray[k].includes("children")) {
                childData.children = [];

                childData.children.push(dataArray[k]);
              } else {
                break;
              }
            }
          } else {
            break;
          }
        }

        parsedData.push(data);
      }
    }

    // console.log(dataArray);
    console.log(parsedData);
  }

  // let ex = {
  //   parent: "chapter 1",
  //   direct_children: [
  //     { name: " title 1" },
  //     { name: "title 2", children: ["title 2.1", "title 2.2"] },
  //   ],
  // };

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
