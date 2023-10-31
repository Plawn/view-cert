import { DateType } from "@date-io/type";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { FormikProps } from "formik";
import React, { CSSProperties, useState } from "react";
import { format } from 'date-fns';

// dateFns.format()

type Props = {
  onChange?: (date: MaterialUiPickersDate) => void;
  initialValue?: DateType;
  form?: FormikProps<any>;
  field?: { name: string; value: any };
  name?: string;
  label?: string;
  value?: DateType;
  style?: CSSProperties;
  className?: string;
  onlyDate?: boolean;
  disabled?: boolean;
  gmt?: boolean;
};

function FormikDatePickerField(props: Props) {
  const [value, setValue] = useState(props.value! || props.initialValue);
  const { disabled, className, gmt } = props;
  const handleChange = (date: Date) => {
    setValue(date);
    props.form && props.field && props.form.setFieldValue(props.field.name, date, true);
    props.onChange && props.onChange(date);
  };

  return (
    <DateTimePicker
      className={className}
      disabled={disabled}
      value={value}
      ampm={false}
      autoOk
      labelFunc={e => {
        if (gmt) {
          return format(new Date(new Date(e!).getTime() + new Date().getTimezoneOffset() * 60_000), "dd/MM/yyyy à HH:mm 'GMT");
        } else {
          return format(e!, "dd/MM/yyyy à HH:mm");
        }
      }}
      // format="dd/MM/yyyy à HH:mm 'GMT"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <CalendarIcon color="primary" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      onChange={(e: MaterialUiPickersDate) => handleChange(e!)}
    />
  );
}

export default FormikDatePickerField;
