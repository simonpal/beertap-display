import React from "react";
import styled from "styled-components";
import { GiHops, GiWheat } from "react-icons/Gi";
import { mergeKeys } from "../utils";
import { Field } from "./FieldType";
import { ModalTitle } from "./layout/ModalTitle";

// const TableTitle = styled.h4`
//   text-align: center;
//   margin-top: 2rem;
//   margin-bottom: 1rem;
//   width: 100%;
//   font-size: 1.1rem;
//   color: ${({ theme }) => theme.colors.primary};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   svg {
//     margin-right: 0.75rem;
//   }
// `;

const TableTitle = styled(ModalTitle)`
  text-align: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  //overflow: auto;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  table {
    border-collapse: collapse;
    min-width: 100%;
    th {
      text-transform: capitalize;
      padding: 0.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      &:last-of-type {
        border-right: 0;
      }
    }
    tr td {
      padding: 0.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      &:last-of-type {
        border-right: 0;
      }
      span:last-of-type {
        text-align: left;
      }
    }
    div {
      padding: 0;
      text-align: left;
    }
  }
`;

interface ItemTableProps {
  title: string;
  array: string[];
}

export const ItemTable: React.FC<ItemTableProps> = ({ title, array }) => {
  const allKeys: string[] = array.reduce(
    (acc: any, curr: any) => mergeKeys(acc, Object.keys(curr)),
    []
  );

  let Icon = GiWheat;
  if (title === "Hops") Icon = GiHops;

  return (
    <>
      {title && (
        <TableTitle>
          <Icon />
          {title}
        </TableTitle>
      )}

      <TableWrapper>
        <table>
          <thead>
            <tr>
              {allKeys.map((title, index) => (
                <th key={`th-${index}-${title}`}>{title}</th>
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
                      <td key={`td-${index}-${title}`}>
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
      </TableWrapper>
    </>
  );
};
