import React, { useState, memo } from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const TextField: React.FC<TextFieldProps> = memo(props => (
	<MuiTextField
		InputLabelProps={{
			style: {
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				overflow: "hidden",
				width: "100%",
			},
		}}
		fullWidth
		{...props}
	/>
));

export default TextField;

export function useTextField(initialValue?: string, textFieldProps?: TextFieldProps): [string, JSX.Element] {
	const [value, setValue] = useState<string>(initialValue || "");

	const Field = <TextField {...textFieldProps} value={value} onChange={e => setValue(e.target.value)} />;

	return [value, Field];
}

const useMultiLineStyles = makeStyles({
	multiLineField: {
		width: "100%",
		margin: "3 em",
		padding: "3 em",
	},
});

export function MultiLineTextField(props: Omit<TextFieldProps, "onChange"> & { onChange: (s: string) => void }) {
	const classes = useMultiLineStyles();
	return <TextField
		label="Editer la Description"
		placeholder="Décrire l'item"
		multiline
		rowsMax="10"
		variant="outlined"
		{...props}
		onChange={e => props.onChange(e.target.value)}
		className={classes.multiLineField}
	/>
}