import React from "react";
import MultipleFilesInputField, { MultipleFilesInputFieldProps } from "./MultipleFilesInputField";

type Props = Omit<MultipleFilesInputFieldProps,"onChange"> & { 
	onChange: (file: File) => void;
};

const FileInputField = (props: Props) => {
	
	const onChange = (files: File[]) => {
		if (files.length > 1){
			throw new Error("Only one file is accepted");
		};
		props.onChange(files[0]);
	}

	return (
		<MultipleFilesInputField {...props} onChange={onChange}/>
	);
};

export default FileInputField;
