import { TextField } from '@material-ui/core';
import React from 'react';

export default function MultilineStringWidget(props: any) {
    return (
      <TextField
        {...props}
        fullWidth
        multiline
        rowsMax={10}
        autoComplete="off"
        variant="outlined"
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
        value={props.value}
      />
    );
  }
  