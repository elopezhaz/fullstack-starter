import * as inventoryDuck from '../ducks/inventory'
import * as productDuck from '../ducks/products'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
<<<<<<< HEAD
import InventoryDeleteModal from '../components/Inventory/InventoryDeleteModal'
import InventoryFormModal from '../components/Inventory/InventoryFormModal'
=======
import ImageIcon from '@material-ui/icons/Image'
import InventoryFormModal from '../components/Inventory/InventoryFormModal'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
import { makeStyles } from '@material-ui/core/styles'
import { MeasurementUnits } from '../constants/units'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { Avatar, ListItemAvatar, ListItemIcon } from '@material-ui/core'
import { EnhancedTableHead, EnhancedTableToolbar, getComparator, stableSort } from '../components/Table'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  }
}))

const normalizeInventory = (inventory) => inventory.map(inv => ({
  ...inv,
  unitOfMeasurement: MeasurementUnits[inv.unitOfMeasurement].name,
  bestBeforeDate: moment(inv.bestBeforeDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
}))

const headCells = [
  { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
  { id: 'productType', align: 'right', disablePadding: false, label: 'Product' },
  { id: 'description', align: 'right', disablePadding: false, label: 'Description' },
  { id: 'amount', align: 'right', disablePadding: false, label: 'Amount' },
  { id: 'unitOfMeasurement', align: 'right', disablePadding: false, label: 'Unit of Measurement' },
  { id: 'bestBeforeDate', align: 'right', disablePadding: false, label: 'Best Before Date' },
]

const InventoryLayout = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.all)
  const inventory = useSelector(state => state.inventory.all)
  const isFetched = useSelector(state => state.inventory.fetched && state.products.fetched)
<<<<<<< HEAD
  const removeInventory = useCallback(ids => { dispatch(inventoryDuck.removeInventory(ids)) }, [dispatch])
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
  const saveInventory = useCallback(inventory => { dispatch(inventoryDuck.saveInventory(inventory)) }, [dispatch])

  useEffect(() => {
    if (!isFetched) {
      dispatch(inventoryDuck.findInventory())
      dispatch(productDuck.findProducts())
    }
  }, [dispatch, isFetched])

  const normalizedInventory = normalizeInventory(inventory)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])

  const [isCreateOpen, setCreateOpen] = React.useState(false)
<<<<<<< HEAD
  const [isDeleteOpen, setDeleteOpen] = React.useState(false)
  const toggleCreate = () => {
    setCreateOpen(true)
  }
  const toggleDelete = () => {
    setDeleteOpen(true)
  }
  const toggleModals = (resetSelected) => {
    setCreateOpen(false)
    setDeleteOpen(false)
    if (resetSelected) {
      setSelected([])
    }
  }

=======
  const toggleCreate = () => {
    setCreateOpen(true)
  }

  const toggleModals = (resetChecked) => {
    setCreateOpen(false)
    if (resetChecked) {
      setChecked([])
    }
  }

  const [checked, setChecked] = React.useState([])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = normalizedInventory.map((row) => row.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  return (
    <Grid container>
      <Grid item xs={12}>
        <EnhancedTableToolbar numSelected={selected.length}
          title='Inventory'
          toggleCreate={toggleCreate}
<<<<<<< HEAD
          toggleDelete={toggleDelete}
=======
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
        />
        <TableContainer component={Paper}>
          <Table size='small' stickyHeader>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={normalizedInventory.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(normalizedInventory, getComparator(order, orderBy))
                .map(inv => {
                  const isItemSelected = isSelected(inv.id)
                  return (
                    <>
                      <TableRow
                        hover
<<<<<<< HEAD
                        onChange={(event) => handleClick(event, inv.id)}
=======
                        onClick={(event) => handleClick(event, inv.id)}
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={inv.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
<<<<<<< HEAD
                          <Checkbox
                            checked={isItemSelected}
                          />
=======
                          <Checkbox checked={isItemSelected} />
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
                        </TableCell>
                        <TableCell padding="none">{inv.name}</TableCell>
                        <TableCell align="right">{inv.productType}</TableCell>
                        <TableCell align="right">{inv.description}</TableCell>
                        <TableCell align="right">{inv.amount}</TableCell>
                        <TableCell align="right">
                          {inv.unitOfMeasurement}
                        </TableCell>
                        <TableCell align="right">
<<<<<<< HEAD
                          {inv.neverExpires ? 'Never Expires' : inv.bestBeforeDate}
                        </TableCell>
                      </TableRow>
=======
                          {inv.bestBeforeDate}
                        </TableCell>
                      </TableRow>
                      <List dense disablePadding className={classes.root}>
                        {inventory.map((value, index) =>
                          <React.Fragment key={index}>
                            <Divider />
                            <ListItem button onClick={handleToggle(value)}>
                              <ListItemIcon>
                                <Checkbox
                                  onChange={handleToggle(value)}
                                  checked={checked.indexOf(value) !== -1}
                                />
                              </ListItemIcon>
                              <ListItemAvatar>
                                <Avatar className={classes.medium}>
                                  <ImageIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={value.name} />
                            </ListItem>
                          </React.Fragment>
                        )}
                      </List>
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
                    </>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <InventoryFormModal
          title='Create'
          formName='inventoryCreate'
          isDialogOpen={isCreateOpen}
          handleDialog={toggleModals}
          handleInventory={saveInventory}
<<<<<<< HEAD
          initialValues={{
            name: '',
            productType: '',
            description: '',
            averagePrice: 0,
            amount: 0,
            unitOfMeasurement: '',
            bestBeforeDate: moment().format('YYYY-MM-DD'),
            neverExpires: false,
          }}
          products={products}/>
        <InventoryDeleteModal
          isDialogOpen={isDeleteOpen}
          handleDelete={removeInventory}
          handleDialog={toggleModals}
          initialValues={selected}
        />
=======
          initialValues={{}}
          products={products}/>
>>>>>>> 53c5aa3 (style for backend. form modal partially working. required fields not working yet and table doesn't look right)
      </Grid>
    </Grid>
  )
}

export default InventoryLayout