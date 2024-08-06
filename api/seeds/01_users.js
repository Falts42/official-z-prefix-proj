/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Rick',
      last_name: 'Roll',
      username: 'big-man',
      password: 'nevergonnagiveyouup'
    },
    {first_name: 'Billy',
      last_name: 'Joel',
      username: 'Piano-man',
      password: 'manwhatareyoudoinghere'
    },
    {first_name: 'Kool-Aid',
      last_name: 'Man',
      username: 'OOOOOOH-YEAH',
      password: 'gonnaneedanewdoor'
    }
  ]);
};
