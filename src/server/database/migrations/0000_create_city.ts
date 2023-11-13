import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.citys, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();

      table.comment('Tabela usada para armazenar cidades do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.citys}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.citys)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.citys}`);
    });
}