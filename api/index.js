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

//=======================GET USER=============================================
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

//==================get Manager Inventory==================================
app.get("/inventory/:userId", async (req, res) => {
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