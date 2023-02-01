import React from "react";
import { KeyValue } from "./recipe/KeyValue";
import { isNull } from "../utils";
import { ItemTable } from "./FieldTable";

interface Props {
  prop: string;
  value: any;
}

interface ObjectProps {
  prop: string;
  obj: any;
  renderValueType?: (key: string, value: any) => JSX.Element | undefined;
}

export const ObjectWithProps: React.FC<ObjectProps> = ({ prop, obj }) => {
  // const [isActive, setIsActive] = useState<boolean>();
  return (
    <div key={prop}>
      <h3>
        <span>{prop}</span>
      </h3>
      {Object.entries(obj).map((item) => {
        const [key, value] = item;
        return <Field key={key} prop={key} value={value} />;
      })}
    </div>
  );
};

export const Field = ({ prop, value }: Props) => {
  if (prop.startsWith("_") || isNull(value)) return null;
  switch (true) {
    case typeof value === "undefined" || isNull(value) || value === "":
      return <KeyValue key={prop} title={prop} value="-" />;
    case typeof value === "string" || typeof value === "number":
      return <KeyValue key={prop} title={prop} value={`${value}`} />;
    case prop.toLowerCase().includes("date"):
      return (
        <KeyValue
          key={prop}
          title={prop}
          value={new Date(value).toLocaleString("sv-SE")}
        />
      );
    case value instanceof Array:
      return <ItemTable key={prop} title={prop} array={value} />;
    case typeof value === "boolean":
      return <KeyValue key={prop} title={prop} value={value ? "Yes" : "No"} />;
    case typeof value === "object":
      return <ObjectWithProps key={prop} prop={prop} obj={value} />;
    case value.endsWith && value.endsWith(".jpg"):
      return <img key={prop} src={value} />;
    default:
      return <KeyValue key={prop} title={prop} value={value} />;
  }
};

// export const FieldType = ({ field }: any) => {
//   let type = typeof field as FieldType;
//   if (Array.isArray(field)) {
//     type = "array";
//   }
//   let ret;
//   switch (type) {
//     case "string":
//       ret = <div>{field}</div>;
//     case "boolean":
//       ret = <div>{field ? "true" : "false"}</div>;
//     case "number":
//       ret = <div>{field}</div>;
//     case "array":
//       ret = field.map((f: any) => <FieldType field={f} />);
//     case 'object':
//       ret = Object.values(field).map((f: any) => <FieldType field={f} />);
//   }

//   return ret;
// };

// const Field = ({key, value}: any) => {
//   return ()
// }
