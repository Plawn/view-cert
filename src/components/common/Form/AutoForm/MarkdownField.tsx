import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Typography } from '@material-ui/core';

export default function MarkdownField(props: any) {
    return (
        <>
            <Typography>
                {props.label}
            </Typography>
            <MDEditor
                value={props.value}
                onChange={(e) => props.onChange(e || '')}
                preview='live'
                height={100}
            />
        </>
    );
}
