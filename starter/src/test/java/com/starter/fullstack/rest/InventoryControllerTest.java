package com.starter.fullstack.rest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starter.fullstack.api.Inventory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class InventoryControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private MongoTemplate mongoTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  private Inventory inventory;

  @Before
  public void setup() throws Throwable {
    this.inventory = new Inventory();
    this.inventory.setId("ID");
    this.inventory.setName("TEST");
    // Sets the Mongo ID
    this.inventory = this.mongoTemplate.save(this.inventory);
  }

  @After
  public void teardown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test findAll endpoint.
   * @throws Throwable see MockMvc
   */
  @Test
  public void findAll() throws Throwable {
    this.mockMvc.perform(get("/inventory")
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json("[" + this.objectMapper.writeValueAsString(inventory) + "]"));
  }

  /**
   * Test create endpoint.
   * @throws Throwable see MockMvc
   */
  @Test
  public void create() throws Throwable {
    this.inventory = new Inventory();
    this.inventory.setId("OTHER ID");
    this.inventory.setName("ALSO TEST");
    this.mockMvc.perform(post("/inventory")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(this.inventory)))
         .andExpect(status().isOk());

    Assert.assertEquals(2, this.mongoTemplate.findAll(Inventory.class).size());
  }

  /**
   * Test remove endpoint.
   * @throws Throwable see MockMvc
   */
  @Test
  public void remove() throws Throwable {
    Inventory inventory2 = new Inventory();
    inventory2.setId("OTHER ID");
    inventory2.setName("ALSO TEST");
    inventory2 = this.mongoTemplate.save(inventory2);
    String[] ids = new String[] {this.inventory.getId(), inventory2.getId()};
    this.mockMvc.perform(delete("/inventory/")
        .content(this.objectMapper.writeValueAsString(ids))
        .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk());

    Assert.assertEquals(0, this.mongoTemplate.findAll(Inventory.class).size());
  }

  /**
   * Test update endpoint.
   * @throws Throwable see MockMvc
   */
  @Test
  public void update() throws Throwable {
    Inventory toUpdate = new Inventory();
    toUpdate.setId(this.inventory.getId());
    toUpdate.setName("NEW TEST");
    toUpdate.setDescription("DESCRIPTION");
    toUpdate.setVersion(2);
    this.mockMvc.perform(put("/inventory/" + this.inventory.getId())
          .content(this.objectMapper.writeValueAsString(toUpdate))
          .contentType(MediaType.APPLICATION_JSON)
          .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(content().json(this.objectMapper.writeValueAsString(toUpdate)));
  }
}