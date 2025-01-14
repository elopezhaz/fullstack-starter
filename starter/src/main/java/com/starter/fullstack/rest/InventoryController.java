package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

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
  @RequestMapping(value = "{id}", method = {RequestMethod.PUT})
  public @ResponseBody Optional<Inventory> updateInventory(@PathVariable("id") String id, @RequestBody Inventory inventory) {
    Optional<Inventory> updated = this.inventoryDAO.update(id, inventory);
    return updated;
  }
  @DeleteMapping
  public Optional<List<Inventory>> deleteInventory(@RequestBody String[] ids) {
    return this.inventoryDAO.delete(ids);
  }
}