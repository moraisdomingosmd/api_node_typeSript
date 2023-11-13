import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(Knex: Knex) {
  return Knex.schema.createTable(ETableNames.persons, table => {
    table.bigIncrements('id').primary().index()
    table.string('email', 150).checkLength('<=', 150).unique().notNullable()
    table.string('firstName').index().notNullable()
    table.string('secondName').notNullable()
    table.string('cityId').index().notNullable().references('id')
    .inTable('citys').onUpdate('CASCADE').onDelete('RESTRICT')

    table.comment('Tabela usada para armazenar pessoas do sistema')
  }).then(() => {
    console.log(`# Created table ${ETableNames.persons}`)
  })
}

export async function down(Knex: Knex) {
  return Knex.schema
    .dropTable(ETableNames.persons)
      .then(() => {
        console.log(`# Dropped table ${ETableNames.persons}`)
      })
}