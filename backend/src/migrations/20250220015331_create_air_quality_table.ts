import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('air_quality_data', (table) => {
    table.increments('id');
    table.timestamp('date_time', { useTz: true }).notNullable();
    table.float('co');
    table.float('nmhc');
    table.float('benzene');
    table.float('nox');
    table.float('no2');
    table.float('sensor1');
    table.float('sensor2');
    table.float('sensor3');
    table.float('sensor4');
    table.float('sensor5');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('air_quality_data');
}