import {
    CircularProgress,
    makeStyles,
    Theme,
    Typography
  } from "@material-ui/core";
  import { CSSProperties } from "@material-ui/styles";
  import * as React from "react";
  
  type Props<T> = {
    style?: CSSProperties;
    text?: string;
    loading?: boolean;
    children: (a: T) => JSX.Element;
    data?: T;
  };
  
  const useStyles = makeStyles((theme: Theme) => ({
    div: (props: Props<any>) => ({
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
  
  function ProviderLoadingComponent<T>(props: Props<T>) {
    const { data, loading, children } = props;
    const classes = useStyles(props);
    return loading || !Boolean(data) ? (
      <div className={classes.div}>
        <div style={{ textAlign: "center" }}>
          {props.text && <Typography variant="h2">{props.text}</Typography>}
          <CircularProgress />
        </div>
      </div>
    ) : (
      <div style={props.style}>{children(data!)}</div>
    );
  };
  
  export default ProviderLoadingComponent;
  