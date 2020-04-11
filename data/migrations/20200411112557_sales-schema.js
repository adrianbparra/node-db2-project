
exports.up = function(knex) {
  return knex.schema.createTable("sales", table => {
    table.increments();

    table.integer("car_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cars")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")

    table.decimal("sold_price").notNullable();

    table.decimal("price").notNullable();

    table.text("buyer_name").notNullable();

    table.text("buyer_email")

  })
};

exports.down = function(knex) {
  
};
