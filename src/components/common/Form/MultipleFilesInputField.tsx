import React, { useState, useMemo, CSSProperties, useCallback } from "react";
import { Button, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "../Snackbar/atom";

type AvailableExtensions = "doc" | "docx" | "pdf" | "xlsx" | "xls" | "ppt" | "pptx" | "png" | "jpg" | "json" | "csv";

export type MultipleFilesInputFieldProps = {
	onChange: (file: File[]) => void;
	authorizedExtensions?: AvailableExtensions[];
	labelStyle?: CSSProperties;
	buttonStyle?: CSSProperties;
	style?: CSSProperties;
};

const defaultExtensions: AvailableExtensions[] = ["json", "xlsx"];

const MultipleFilesInputField = (props: MultipleFilesInputFieldProps) => {
	const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
	const { onChange, authorizedExtensions } = props;
	const snackbar = useSnackbar();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			try {
				console.log('onchange');
				props?.onChange(acceptedFiles);
				setSelectedFiles(acceptedFiles);
			} catch (e: any) {
				snackbar('error', e.message);
			}
		},
		[onChange, snackbar],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const extensions = useMemo(() => (authorizedExtensions ?? defaultExtensions).map(ext => "." + ext).join(","), [authorizedExtensions]);

	return (
		<div {...getRootProps()} style={{ display: "inline", float: "left", ...props.style }}>
			<input {...getInputProps()} accept={extensions} id="raised-button-file" hidden={true} />
			<label htmlFor="raised-button-file" style={{ ...props.labelStyle }}>
				{isDragActive ? (
					<Button
						variant="outlined"
						color="primary"
						style={{ marginRight: "10px", ...props.buttonStyle }}
						size="small"
					>
						Drop the file here
					</Button>
				) : (
					<Button
						variant="outlined"
						color="primary"
						style={{ marginRight: "10px", border: "1px dashed grey", ...props.buttonStyle }}
						size="small"
					>
						Browse
					</Button>
				)}
				{/* {selectedFile && selectedFile.name} */}
				<TextField
					placeholder="Choose a file"
					value={selectedFiles?.map(f => f.name).join(', ') ?? ""}
				/>
			</label>
		</div>
	);
};

export default MultipleFilesInputField;
