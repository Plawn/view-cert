import { Button } from "@material-ui/core";
import { FormProps, withTheme } from "@rjsf/core";
import { Theme as MaterialUITheme } from "@rjsf/material-ui";
import React from "react";
import MultilineStringWidget from "./MultilineField";
import MarkdownField from "./MarkdownField";

const BaseAutoForm = withTheme(MaterialUITheme);

type Props<T> = {
  validated?: boolean;
  disabled?: boolean;
} & FormProps<T>;

const defaultWidgets = {
  myMultilineStringWidget: MultilineStringWidget,
  markdownWidget: MarkdownField,
};

const AutoForm = React.forwardRef(function <T>(props: Props<T>, ref: any) {
  const { validated, disabled, widgets, ...rest } = props;
  const _disabled = validated || disabled;
  return (
    <BaseAutoForm
      {...rest}
      // @ts-ignore
      ref={ref}
      disabled={_disabled}
      widgets={{ ...defaultWidgets, ...widgets }}
    >
      {_disabled ? (
        <></>
      ) : (
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      )}
    </BaseAutoForm>
  );
});

export default AutoForm;
