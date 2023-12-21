import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { MeasurementUnits } from '../../constants/units'
import moment from 'moment'
import React from 'react'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'
import { Checkbox, FormControl, FormControlLabel, MenuItem } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
    const { formName, handleDialog, handleInventory, title, initialValues, products } =
      this.props

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

    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => {
          handleDialog(false)
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values) => {
            values.bestBeforeDate = new Date(values.bestBeforeDate).toJSON()
            {title === 'Edit' ? handleInventory(values.id, values) : handleInventory(values)}
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
                        custom = {{ fullWidth: true }}
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
                      type = 'number'
                      component = {TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name = 'amount'
                      label = 'Amount'
                      type = 'number'
                      component = {TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={12}>
                    <FormControl fullWidth variant = 'outlined' required>
                      <InputLabel id = 'unitId'>Unit of Measurement</InputLabel>
                      <Field
                        custom = {{ fullWidth: true }}
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