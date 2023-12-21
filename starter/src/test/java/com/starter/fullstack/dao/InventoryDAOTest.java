package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import java.util.List;
import java.util.Optional;
import javax.annotation.Resource;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test Inventory DAO.
 */
@DataMongoTest
@RunWith(SpringRunner.class)
public class InventoryDAOTest {
  @ClassRule
  public static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

  @Resource
  private MongoTemplate mongoTemplate;
  private InventoryDAO inventoryDAO;
  private static final String NAME = "Amber";
  private static final String PRODUCT_TYPE = "hops";
  private Inventory inventory = new Inventory();

  @Before
  public void setup() {
    this.inventoryDAO = new InventoryDAO(this.mongoTemplate);
    inventory.setId("123456");
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
  }

  @After
  public void tearDown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test Find All method.
   */
  @Test
  public void findAll() {
    this.mongoTemplate.save(this.inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    Assert.assertFalse(actualInventory.isEmpty());
  }

  @Test
  public void create() {
    Inventory createdInv = this.inventoryDAO.create(inventory);
    Assert.assertEquals(inventory, createdInv);
    List<Inventory> invList = this.inventoryDAO.findAll();
    Assert.assertTrue(invList.contains(inventory));
    Assert.assertEquals(1, invList.size());
    Assert.assertNotEquals("123456", createdInv.getId());
  }

  @Test
  public void delete() {
    Inventory createdInv = this.inventoryDAO.create(inventory);
    this.inventoryDAO.delete(createdInv.getId());
    Assert.assertEquals(Optional.empty(), this.inventoryDAO.retrieve(createdInv.getId()));
    Assert.assertFalse(this.inventoryDAO.findAll().contains(inventory));
  }

  @Test
  public void update() {
    this.inventoryDAO.create(inventory);
    Inventory toUpdate = new Inventory();
    toUpdate.setId(inventory.getId());
    toUpdate.setName("New Name");
    toUpdate.setDescription("Description");
    this.inventoryDAO.update(inventory.getId(), toUpdate);
    Inventory updated = this.inventoryDAO.retrieve(inventory.getId()).get();
    Assert.assertEquals(updated, toUpdate);
  }
}
