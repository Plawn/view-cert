export function contentToDisk(content: string, filename: string): void;
export function contentToDisk(content: Blob, filename: string): void;
export function contentToDisk(content: Uint8Array, filename: string): void;
export function contentToDisk(content: Uint8Array[], filename: string): void;

export function contentToDisk(content: string | Blob | Uint8Array | Uint8Array[], filename: string) {
	if (typeof content === "string") {
		downloadString(content, filename);
	} else if (content instanceof Blob) {
		downloadBlob(content, filename);
	} else if (Array.isArray(content)) {
		downloadUint8ArrayArray(content, filename);
	} else {
		downloadUint8ArrayArray([content], filename);
	}
}

/**
 * Legacy
 * @param url
 */
export const downloadDocumentFromUrl = (url: string, filename?: string) => {
	const link = document.createElement("a");
	link.href = url;
	link.target = "_blank";
	if (filename) {
		link.download = filename;
	}
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};


function downloadString(s: string, filename: string) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(s));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function downloadUint8ArrayArray(data: Uint8Array[], filename: string) {
	const blob = new Blob(data, {
		type: 'application/octet-stream'
	});
	downloadBlob(blob, filename);
}


function downloadBlob(blob: Blob, filename: string) {
	const objectURL = window.URL.createObjectURL(blob);
	const fileLink = document.createElement("a");
	fileLink.href = objectURL;
	fileLink.download = filename;
	fileLink.click();
	// TODO: clear link
}


/**
 * Allow to download the object in a json file
 */
export function downloadObjectAsJson(exportObj: string, exportName: string) {
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
	let downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}