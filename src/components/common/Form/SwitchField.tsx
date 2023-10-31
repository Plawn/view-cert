import { FormControlLabel, Switch, SwitchProps } from '@material-ui/core';
import React from 'react';


type Props = SwitchProps & {
  label: string;
}

const SwitchField = React.memo(function SwitchField(props: Props) {
  const { label, ...rest } = props;

  return (
    <>
      <FormControlLabel
        control={<Switch {...rest} />}
        label={label} />
    </>
  )
});

export default SwitchField;