import {
  CircularProgress,
  Theme,
  Typography,
} from "@mui/material";
import { CSSProperties,   makeStyles, } from "@mui/styles";
import { ReactNode } from "react";

type Props = {
  style?: CSSProperties;
  text?: string;
  loading?: boolean;
  children?: ReactNode;
};

const useStyles = makeStyles((theme: Theme) => ({
  div: (props: Props) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em",
    ...props.style,
  }),
  // child: ({ style }: Props) => ({ ...style! }),
}));

const LoadingComponent = (props: Props) => {
  // const classes = useStyles(props);
  return props.loading ? (
    <div 
    // className={classes.div}
    >
      <div style={{ textAlign: "center" }}>
        {props.text && <Typography variant="h2">{props.text}</Typography>}
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div style={props.style}>{props.children}</div>
  );
};

export default LoadingComponent;
