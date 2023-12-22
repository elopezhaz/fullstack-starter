package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.swing.text.html.Option;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.util.Assert;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

/**
 * Inventory DAO
 */
public class InventoryDAO {
  private final MongoTemplate mongoTemplate;
  private static final String NAME = "name";
  private static final String PRODUCT_TYPE = "productType";

  /**
   * Get search query from id
   * @param id Id of object to find.
   * @return query Query that can be used to find object
   */
  private Query getQuery(String id) {
    return new Query(Criteria.where("id").is(id));
  }

  private Query getBatchQuery(List<String> ids) {
    return new Query(Criteria.where("id").in(ids));
  }

  private Update getUpdateQuery(Inventory inv) {
    return new Update()
      .set("name", inv.getName())
      .set("productType", inv.getProductType())
      .set("description", inv.getDescription())
      .set("averagePrice", inv.getAveragePrice())
      .set("amount", inv.getAmount())
      .set("unitOfMeasurement", inv.getUnitOfMeasurement())
      .set("bestBeforeDate", inv.getBestBeforeDate())
      .set("neverExpires", inv.getNeverExpires());
  }

  /**
   * Default Constructor.
   * @param mongoTemplate MongoTemplate.
   */
  public InventoryDAO(MongoTemplate mongoTemplate) {
    Assert.notNull(mongoTemplate, "MongoTemplate must not be null.");
    this.mongoTemplate = mongoTemplate;
  }

  /**
   * Constructor to build indexes for rate blackout object
   */
  @PostConstruct
  public void setupIndexes() {
    IndexOperations indexOps = this.mongoTemplate.indexOps(Inventory.class);
    indexOps.ensureIndex(new Index(NAME, Sort.Direction.ASC));
    indexOps.ensureIndex(new Index(PRODUCT_TYPE, Sort.Direction.ASC));
  }

  /**
   * Find All Inventory.
   * @return List of found Inventory.
   */
  public List<Inventory> findAll() {
    return this.mongoTemplate.findAll(Inventory.class);
  }

  /**
   * Save Inventory.
   * @param inventory Inventory to Save/Update.
   * @return Created/Updated Inventory.
   */
  public Inventory create(Inventory inventory) {
    inventory.setId(null);
    return this.mongoTemplate.save(inventory);
  }

  /**
   * Retrieve Inventory.
   * @param id Inventory id to Retrieve.
   * @return Found Inventory.
   */
  public Optional<Inventory> retrieve(String id) {
    return Optional.ofNullable(this.mongoTemplate.findOne(getQuery(id), Inventory.class));
  }

  /**
   * Update Inventory.
   * @param id Inventory id to Update.
   * @param inventory Inventory to Update.
   * @return Updated Inventory.
   */
  public Optional<Inventory> update(String id, Inventory inventory) {
    return Optional.ofNullable(this.mongoTemplate.findAndModify(getQuery(id), getUpdateQuery(inventory),
      options().returnNew(true).upsert(true), Inventory.class));
  }

  /**
   * Delete Inventory By Id.
   * @param ids List of ids of Inventories to delete.
   * @return Deleted Inventory.
   */
//  public Optional<List<Inventory>> delete(String[] ids) {
  public Optional<List<Inventory>> delete(String[] ids) {
    List<String> listIds = new ArrayList<>(Arrays.asList(ids));
    return Optional.of(this.mongoTemplate.findAllAndRemove(getBatchQuery(listIds), Inventory.class));
  }
}
