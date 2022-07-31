import { Button } from "@mui/material";
import React from "react";

function NewComponent(props) {
  const { title, options } = props;
  const [selectedoption, setSelectedOption] = React.useState({});
  return (
    <>
      <div className="container">
        <div>
          <span className="p-1 mb-3">{title}</span>
          {options.map((o) => (
            <span
              onClick={() => {
                console.log(title, o.value);
                setSelectedOption({
                  template: title,
                  menu: o.value,
                });
              }}
              className="p-1 border border-primary m-1"
            >
              {o.value}
            </span>
          ))}
          <Button
            onClick={() => {
              console.log(selectedoption);
            }}
          >
            submit
          </Button>
        </div>
      </div>
    </>
  );
}

let Component1 = () => {
  const data = [
    {
      templateName: "Drinks",
      options: [
        { label: "1", value: "tea" },
        { label: "2", value: "coffee" },
        { label: "3", value: "horlicks" },
      ],
    },
    {
      templateName: "Lunch",
      options: [
        { label: "1", value: "veg rice" },
        { label: "2", value: "tomato rice" },
        { label: "3", value: "lemon rice" },
      ],
    },
  ];
  return (
    <div>
      {data.map((d) => (
        <NewComponent title={d.templateName} options={d.options} />
      ))}
    </div>
  );
};

export default Component1;
