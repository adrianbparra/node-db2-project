
exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
      table.increments("id");

      table.decimal("vin").unique().notNullable();

      table.string("make",128).notNullable();

      table.string("model",128).notNullable();

      table.decimal("mileage").notNullable();

      table.string("transmission_type");
      
      table.string("title_status");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
