const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get("/", (req, res) => {

  res.send("My API is up and running Yo!");
});

//===========================GET ALL Items in Inventory==========================================
app.get('/inventory', (req, res) => {
  knex('items').select('*')
    .then(data => res.status(200).json(data))
});

//===========================GET Item by Name==========================================
app.get("/inventory/:item_name", async (req, res) => {
  const { item_name } = req.params;
  if (!item_name) {
    return res
      .status(400)
      .json({ error: "empty item name field" });
  }

  try {
    const item = await knex("items")
      .select("*")
      .where({ item_name: item_name })
      .first();

    if (!item) return res.status(404).json({ error: "item not found" });

    return res.json(item);
  } catch (error) {
    console.error("error fetching inventory", error);
    return res.status(500).json({ error: "failed to fetch inventory" + error });
  }
});

//===========================GET Item by ID==========================================
app.get("/inventory/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "empty item name field" });
  }

  try {
    const item = await knex("items")
      .select("*")
      .where({ id: id })
      .first();

    if (!item) return res.status(404).json({ error: "item not found" });

    return res.json(item);
  } catch (error) {
    console.error("error fetching inventory", error);
    return res.status(500).json({ error: "failed to fetch inventory" + error });
  }
});


//=======================POST NEW Item=============================================
app.post("/inventory", async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;

  if (!item_name || !description || !quantity) {
    return res.status(400).json({ error: "empty item field. Please ensure you have your user ID, item name, description, and quantity listed" });
  }
  try {
    const user = await knex("items").insert({ user_id: user_id, item_name: item_name, description: description, quantity: quantity });
    return res.status(202).json({ message: "item successfully added" });
  } catch (error) {
    console.error("error adding item", error);
    return res.status(500).json({ error: "failed to add item" });
  }
});

//=======================UPDATE Item=============================================
app.patch("/inventory/:item_name", async (req, res) => {
  const { item_name } = req.params;
  const { description, quantity} = req.body;

  try {
    const update = await knex("items")
      .where({ item_name: item_name })
      .update({ description: description, quantity: quantity });

    if (update === 0) {
      return res.status(404).json({ error: "item not found" });
    } else {
      return res.status(202).json("Item updated successfully");
    }
  } catch (error) {
    console.error("error updating item ", error);
    return res.status(500).json({ error: "failed to update item" });
  }
});
//=======================PUT Item=============================================
app.put('/inventory/:item_name', (req, res) => {
  knex('items').where('items', req.params.id).update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Game updated' });
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

//=======================DELETE Item=============================================
app.delete("/inventory/:item_name", async (req, res) => {
  const { item_name } = req.params;

  try {
    const deleteItem = await knex("items").where({ item_name: item_name }).del();

    if (deleteItem === 0) {
      return res.status(404).json({ error: "Item not found" });
    } else {
      return res.status(202).json("Item successfully removed");
    }
  } catch (error) {
    console.error("error removing item", error);
    return res.status(500).json({ error: "failed to remove item" });
  }
});

//=======================GET Specific USER=============================================
app.get("/userData/:username", async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res
      .status(400)
      .json({ error: "empty username field, also a change reflects" });
  }

  try {
    const user = await knex("users")
      .select("id", "username")
      .where({ username: username })
      .first();

    if (!user) return res.status(404).json({ error: "Username not found" });

    return res.json(user);
  } catch (error) {
    console.error("error fetching userData", error);
    return res.status(500).json({ error: "failed to fetch userData" + error });
  }
});


//=======================GET All USER=============================================
app.get('/userData', (req, res) => {
  knex('users').select('*')
    .then(data => res.status(200).json(data))
});

//=======================POST New USER=============================================
app.post("/userData", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  if (!first_name || !last_name || !username || !password) {
    return res.status(400).json({ error: "empty user field. Please ensure you have your first name, last name, username, and password listed" });
  }
  try {
    const user = await knex("users").insert({ first_name: first_name, last_name: last_name, username: username, password: password });
    return res.status(202).json({ message: "user successfully added" });
  } catch (error) {
    console.error("error adding item", error);
    return res.status(500).json({ error: "failed to add new user" });
  }
});


//==================get Manager Inventory==================================
app.get("/UserInventory/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId: ", userId);

  try {
    const inventoryRes = await knex("items")
      .join("users", "users.id", "=", "items.user_id")
      .select(
        "items.item_name As item"
      )
      .where("items.user_id", userId);

    res.json(inventoryRes);
  } catch (error) {
    console.error("error fetching inventory data: ", error);
    return res.status(500).json({ error: "failed to fetch user data" });
  }
});

app.listen(port, () => console.log('server is up and running'));