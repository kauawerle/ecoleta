import Knex from 'knex';

export async function seed(knex:Knex) {
 await knex('items').insert([
    { title: 'Lampâdas', image: 'lampadas.svg'},
    { title: 'Pilhas e baterias', image: 'baterias.svg'},
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
    { title: 'Resíduos Orgânicos', image: 'organicos.svg'},
    { title: 'Oléos de cozinha', image: 'oleo.svg'}
  ])
}
