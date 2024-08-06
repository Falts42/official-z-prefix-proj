/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 1,
      item_name: 'watermelon',
      description: 'Juicy, delectible fruit perfect for summertime!',
      quantity: 20
    },
    {user_id: 3,
      item_name: 'Fruit Punch Kool-Aid',
      description: 'A fruity beverage to help you unwind in the heat! Perfect for kids birthday parties!',
      quantity: 120
    },
    {user_id: 2,
      item_name: 'Pasta',
      description: 'Durum wheat pasta, just as the italians intended!',
      quantity: 60
    }
  ]);
};
