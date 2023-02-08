import React from "react";
import styled from "styled-components";
import { mergeKeys } from "../utils";
import { Field } from "./FieldType";

const TableTitle = styled.h4`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
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
    }
    div {
      padding: 0;
      text-align: left;
    }
  }
`;

export const ItemTable = ({ title, array }: any) => {
  const allKeys: string[] = array.reduce(
    (acc: any, curr: any) => mergeKeys(acc, Object.keys(curr)),
    []
  );

  return (
    <>
      {title && <TableTitle>{title}</TableTitle>}

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
