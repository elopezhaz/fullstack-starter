package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.List;
import java.util.Optional;

import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Inventory Controller.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryController {
  private final InventoryDAO inventoryDAO;

  /**
   * Default Constructor.
   * @param inventoryDAO inventoryDAO.
   */
  public InventoryController(InventoryDAO inventoryDAO) {
    Assert.notNull(inventoryDAO, "Inventory DAO must not be null.");
    this.inventoryDAO = inventoryDAO;
  }

  /**
   * Find Inventories.
   * @return List of Inventory.
   */
  @GetMapping
  public List<Inventory> findInventories() {
    return this.inventoryDAO.findAll();
  }

  @PostMapping
  public Inventory createInventory(@RequestBody Inventory inventory) {
    return this.inventoryDAO.create(inventory);
  }
<<<<<<< HEAD
<<<<<<< HEAD
  @RequestMapping(value = "{id}", method = {RequestMethod.DELETE})
  public Optional<Inventory> deleteInventory(@PathVariable("id") String id) {
=======
  @DeleteMapping("{id")
  public Optional<Inventory> deleteInventory(@PathVariable String id) {
>>>>>>> 2078954 (wrote initial delete rest endpoint. no tests yet)
=======
  @RequestMapping(value = "{id}", method = {RequestMethod.DELETE})
  public Optional<Inventory> deleteInventory(@PathVariable("id") String id) {
>>>>>>> 79eae9a (remove endpoint passing tests)
    return this.inventoryDAO.delete(id);
  }
}

