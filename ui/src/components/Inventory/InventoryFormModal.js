<<<<<<< HEAD
<<<<<<< HEAD
import * as Yup from 'yup'
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
import * as Yup from 'yup'
>>>>>>> c2c363d (Create form working)
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { MeasurementUnits } from '../../constants/units'
<<<<<<< HEAD
<<<<<<< HEAD
import moment from 'moment'
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
import moment from 'moment'
>>>>>>> c2c363d (Create form working)
import React from 'react'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'
import { Checkbox, FormControl, FormControlLabel, MenuItem } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
    const { formName, handleDialog, handleInventory, title, initialValues, products } =
      this.props
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c2c363d (Create form working)

    const formSchema = Yup.object({
      name: Yup.string().required(),
      productType: Yup.string().required(),
      description: Yup.string().notRequired().default(''),
      averagePrice: Yup.number().notRequired().default(0),
      amount: Yup.number().notRequired().default(0),
      unitOfMeasurement: Yup.string().required(),
      bestBeforeDate: Yup.string().notRequired().default(moment().format('YYYY-MM-DD')),
      neverExpires: Yup.boolean().notRequired(),
    })

<<<<<<< HEAD
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
=======
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth="sm"
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
>>>>>>> c2c363d (Create form working)
        fullWidth={true}
        onClose={() => {
          handleDialog(false)
        }}
      >
        <Formik
          initialValues={initialValues}
<<<<<<< HEAD
<<<<<<< HEAD
          validationSchema={formSchema}
          onSubmit={(values) => {
            values.bestBeforeDate = new Date(values.bestBeforeDate).toJSON()
=======
          onSubmit={(values) => {
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
          validationSchema={formSchema}
          onSubmit={(values) => {
            values.bestBeforeDate = new Date(values.bestBeforeDate).toJSON()
>>>>>>> c2c363d (Create form working)
            handleInventory(values)
            handleDialog(true)
          }}
        >
          {helpers =>
            <Form autoComplete="off" id={formName}>
              <DialogTitle id="alert-dialog-title">
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing = {2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name = 'name'
                      label = 'Name'
                      component = {TextField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <FormControl fullWidth variant = 'outlined' required>
                      <InputLabel id = 'productTypeId'>Product Type</InputLabel>
                      <Field
<<<<<<< HEAD
<<<<<<< HEAD
                        custom = {{ fullWidth: true }}
=======
                        custom = {{ fullWidth: true, defaultValue: '' }}
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
                        custom = {{ fullWidth: true }}
>>>>>>> c2c363d (Create form working)
                        id = 'productTypeId'
                        name = 'productType'
                        label = 'Product Type'
                        component = {SelectField}
                        required
                      >
                        {products.map((value, index) =>
                          <MenuItem key={index} value={value.name}>
                            {value.name}
                          </MenuItem>
                        )}
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name = 'description'
                      label = 'Description'
                      component = {TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name = 'averagePrice'
                      label = 'Average Price'
<<<<<<< HEAD
<<<<<<< HEAD
                      type = 'number'
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
                      type = 'number'
>>>>>>> c2c363d (Create form working)
                      component = {TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name = 'amount'
                      label = 'Amount'
<<<<<<< HEAD
<<<<<<< HEAD
                      type = 'number'
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
                      type = 'number'
>>>>>>> c2c363d (Create form working)
                      component = {TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <FormControl fullWidth variant = 'outlined' required>
                      <InputLabel id = 'unitId'>Unit of Measurement</InputLabel>
                      <Field
<<<<<<< HEAD
<<<<<<< HEAD
                        custom = {{ fullWidth: true }}
=======
                        custom = {{ fullWidth: true, defaultValue: '' }}
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
                        custom = {{ fullWidth: true }}
>>>>>>> c2c363d (Create form working)
                        id = 'unitId'
                        name = 'unitOfMeasurement'
                        label = 'Unit of Measurement'
                        component = {SelectField}
                        required
                      >
                        {Object.keys(MeasurementUnits).map((value, index) =>
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        )}
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm ={6}>
                    <Field
<<<<<<< HEAD
<<<<<<< HEAD
                      custom = {{ variant: 'outlined' }}
                      name = 'bestBeforeDate'
                      component = {TextField}
                      type = 'date'
                    />
                  </Grid>
                  <Grid item xs={6} sm ={6}>
                    <Field
                      type = 'checkbox'
                      name = 'neverExpires'
                      label = 'Never Expires'
                      as = {FormControlLabel}
                      control = {<Checkbox />}
                    />
=======
                      custom={{ variant: 'outlined', fullWidth: true }}
=======
                      custom = {{ variant: 'outlined' }}
>>>>>>> c2c363d (Create form working)
                      name = 'bestBeforeDate'
                      component = {TextField}
                      type = 'date'
                    />
                  </Grid>
                  <Grid item xs={6} sm ={6}>
<<<<<<< HEAD
                    <FormControlLabel control = {<Checkbox />} label = 'Never Expires' />
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
=======
                    <Field
                      type = 'checkbox'
                      name = 'neverExpires'
                      label = 'Never Expires'
                      as = {FormControlLabel}
                      control = {<Checkbox />}
                    />
>>>>>>> c2c363d (Create form working)
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleDialog(false)
                  }}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  form={formName}
                  color="secondary"
                  disabled={!helpers.dirty}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryFormModal