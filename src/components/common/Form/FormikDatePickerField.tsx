import { DateType } from "@date-io/type";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { FormikProps } from "formik";
import React, { CSSProperties, useState } from "react";

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
};

function FormikDatePickerField(props: Props) {
	const [value, setValue] = useState(props.value! || props.initialValue);
	const { disabled } = props;
	const handleChange = (date: Date) => {
		setValue(date);
		props.form && props.field && props.form.setFieldValue(props.field.name, date, true);
		props.onChange && props.onChange(date);
	};

	return (
		<DatePicker
			className={props.className}
			disabled={disabled}
			value={value}
			// ampm={false}
			autoOk={true}
			format="dd/MM/yyyy"
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
};

export default FormikDatePickerField;