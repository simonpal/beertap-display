import React from 'react';
import styled from 'styled-components';
import { useStorage } from '../utils/storage';
import { Input } from './layout/Input';
import { Label } from './layout/Label';
import { ModalTitle } from './layout/ModalTitle';
import { Checkbox } from './layout/Checkbox';
import SettingsIcon from './icons/SettingsIcon';

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input:not([type='checkbox']) {
    width: 100%;
  }
`;

export const Settings: React.FC = () => {
  const { updateSettings = () => null, settings } = useStorage();

  return (
    <StyledSettings>
      <ModalTitle>
        <SettingsIcon /> Settings
      </ModalTitle>
      <div>
        <Label htmlFor="brewfatherUid">Brewfather user id</Label>
        <Input
          type="text"
          id="brewfaterUid"
          defaultValue={settings.brewfatherUserId}
          onChange={(e) => {
            updateSettings('brewfatherUserId', e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Brewfather api key</Label>
        <Input
          type="text"
          id="brewfaterApiKey"
          defaultValue={settings.brewfatherApiKey}
          onChange={(e) => {
            updateSettings('brewfatherApiKey', e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Number of kegs</Label>
        <Input
          type="number"
          id="noKegs"
          defaultValue={settings.noKegs}
          onChange={(e) => {
            updateSettings('noKegs', Number(e.target.value));
          }}
        />
      </div>
      <div>
        <Checkbox
          label="I have a connected display"
          defaultChecked={settings.connectedDisplay}
          onChange={(e) => {
            updateSettings(
              'connectedDisplay',
              Boolean(e.currentTarget.checked)
            );
          }}
        />
      </div>
      {settings.connectedDisplay && (
        <div>
          <Label>Display API endpoint</Label>
          <Input
            type="text"
            id="displayApiEndpoint"
            defaultValue={settings.displayApiEndpoint}
            onChange={(e) => {
              updateSettings(e.target.id, e.target.value);
            }}
          />
        </div>
      )}
      {/* <div>
        <Button>
          <span>Close</span>
        </Button>
      </div> */}
    </StyledSettings>
  );
};
