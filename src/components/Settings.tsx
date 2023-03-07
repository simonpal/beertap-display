import React from "react";
import styled from "styled-components";
import { useStorage } from "../utils/storage";
import { Button } from "./layout/Button";
import { Input } from "./layout/Input";
import { Label } from "./layout/Label";

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
  }
  h2 {
    text-align: center;
    background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Settings = () => {
  const { updateSettings = () => null, settings } = useStorage();

  return (
    <StyledSettings>
      <h2>Settings</h2>
      <div>
        <Label htmlFor="brewfatherUid">Brewfather user id</Label>
        <Input
          type="text"
          id="brewfaterUid"
          defaultValue={settings.brewfatherUserId}
          onChange={(e) => updateSettings("brewfatherUserId", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Brewfather api key</Label>
        <Input
          type="text"
          id="brewfaterApiKey"
          defaultValue={settings.brewfatherApiKey}
          onChange={(e) => updateSettings("brewfatherApiKey", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Number of kegs</Label>
        <Input
          type="number"
          id="noKegs"
          defaultValue={settings.noKegs}
          onChange={(e) => updateSettings("noKegs", Number(e.target.value))}
        />
      </div>
      {/* <div>
        <Button>
          <span>Close</span>
        </Button>
      </div> */}
    </StyledSettings>
  );
};
