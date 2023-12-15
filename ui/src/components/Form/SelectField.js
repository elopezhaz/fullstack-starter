import { getIn } from 'formik'
<<<<<<< HEAD
=======
import { MenuItem } from '@material-ui/core'
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
import MuiSelectField from '@material-ui/core/Select'
import React from 'react'

const fieldToSelectField = ({
  backgroundColor,
  custom,
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
  helperText,
  onBlur,
  variant,
  warning,
  required,
  ...props
}) => {
  const dirty = getIn(touched, field.name)
  const fieldError = getIn(errors, field.name)
  const showError = dirty && !!fieldError
  return {
    required: required,
    variant: variant,
    error: showError,
    helperText: showError ? fieldError : warning ?? helperText,
    disabled: disabled ?? isSubmitting,
    onBlur: (event) => onBlur ?? fieldOnBlur(event ?? field.name),
    ...custom,
    ...field,
    ...props,
  }
}

export const SelectField = ({ children, ...props }) =>
  <MuiSelectField {...fieldToSelectField(props)}>
    {children}
  </MuiSelectField>

export default SelectField

SelectField.displayName = 'FormikSelectField'
SelectField.tabIndex = 0