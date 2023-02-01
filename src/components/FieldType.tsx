import React from "react";
import styled from "styled-components";

// interface Props {
//   title: string;
//   value: string;
// }

const StyledKeyValue = styled.div`
  flex-basis: 25%;
  padding: 1rem 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  strong {
    display: block;
    margin-bottom: 0.2rem;
    text-transform: capitalize;
  }
`;

interface Props {
  prop: string;
  value: any;
}

interface KeyValueProps {
  title: string;
  value: string | Number;
}
export const KeyValue: React.FC<KeyValueProps> = ({ title, value }) => {
  return (
    <StyledKeyValue data-testid={`data-item-${title}`}>
      {title && <strong>{title}: </strong>}
      {value}
    </StyledKeyValue>
  );
};

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

const mergeKeys = (a: any, b: any): string[] => {
  return [...a, ...b.filter((i: any) => !a.includes(i) && !i.startsWith("_"))];
};
export const isNull = (a: any) => {
  return typeof a === "object" && !a;
};

const ItemTable = ({ title, array }: any) => {
  const allKeys: string[] = array.reduce(
    (acc: any, curr: any) => mergeKeys(acc, Object.keys(curr)),
    []
  );
  return (
    <div>
      {title && <strong>{title}:</strong>}
      <table>
        <thead>
          <tr>
            {allKeys.map((title, index) => (
              <th key={`th-${index}`}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {array.map((line: any, index: number) => {
            return (
              <tr key={`tr-${index}`}>
                {allKeys.map((key, index) => {
                  const value = line[key];
                  // const [key, value] = item;
                  const passKey = key.toLowerCase() === "price" ? key : "";
                  return (
                    <td key={`td-${index}`}>
                      {value !== undefined ? (
                        <Field prop={passKey} value={value} />
                      ) : (
                        <>&nbsp;</>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const Field = ({ prop, value }: Props) => {
  console.log(prop, value);
  if (prop.startsWith("_")) return null;
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
