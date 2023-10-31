import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from "react";
import Icon from "@mui/material/Icon";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { makeStyles } from "@mui/styles";
import { useRecoilState } from "recoil";
import { clearSnackbar, messageAtom as snackbarAtom } from "./atom";

// @ts-ignore
export const SlideTransition = (props: TransitionProps) => <Slide {...props} direction="down" />;

const useStyles = makeStyles({
	error: {
		background: "#c10d12",
	},
	warning: {
		background: "#c17400",
	},
	information: {
		background: "#0054c1",
	},
	check: {
		background: "#008c19",
	},
	message: {
		display: "flex",
		alignItems: "center",
	},
});


const Message = () => {
	const [stayOpen, setStayOpen] = useState(true);
	const [message, setMessage] = useRecoilState(snackbarAtom);

	const classes = useStyles();

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			open={!!message && stayOpen}
			autoHideDuration={2000}
			onClose={() => setStayOpen(false)}
			TransitionComponent={SlideTransition}
			TransitionProps={{
				onExited: () => {
					setStayOpen(true);
					clearSnackbar(setMessage);
				}
			}}
			ContentProps={{
				classes: {
					root: message ? classes[message.type] : "",
				},
				"aria-describedby": "message-id",
			}}
			message={
				message && (
					<span id="client-snackbar" className={classes.message}>
						<Icon style={{ marginRight: "10px" }}>{message.type}</Icon>
						{message.message}
					</span>
				)
			}
			action={[
				<IconButton key="close" aria-label="Close" color="inherit" onClick={() => setStayOpen(false)}>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
};

export default Message;
