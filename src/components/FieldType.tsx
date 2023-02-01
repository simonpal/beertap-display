import React from "react";

export const FieldType = ({ field }: any) => {
  const type = typeof field;
  let ret;
  switch (type) {
    case "string":
      ret = <div>{field}</div>;
    case "boolean":
      ret = <div>{field ? "true" : "false"}</div>;
    case "number":
      ret = <div>{field}</div>;
  }

  return ret;
};
