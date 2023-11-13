import { Knex } from "knex";
import { ETableNames } from "../ETableNames";



export async function up(Knex: Knex) {
  return Knex.schema.createTable(ETableNames.users, table => {
    table.bigIncrements('id').primary().index(),
    table.string('name').notNullable().checkLength('>', 3),
    table.string('email').unique().notNullable().checkLength('>', 5),
    table.string('password').notNullable().index().checkLength('>', 6)

    table.comment('Tabela usada para armazenar usuarios do sistema')
  }).then(() => {
    console.log(`# Created table ${ETableNames.users}`)
  })
}

export async function down(Knex: Knex) {
  return Knex.schema.dropTable(ETableNames.users)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.users}`)
    })
}