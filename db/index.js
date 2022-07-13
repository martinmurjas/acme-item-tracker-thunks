const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_item_tracker_db"
);

const { STRING, INTEGER } = Sequelize;

const User = conn.define("user", {
  name: {
    type: STRING,
  },
  ranking: {
    type: INTEGER,
    defaultValue: 5,
  },
});

const Thing = conn.define("thing", {
  name: {
    type: STRING,
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1,
  },
});

Thing.belongsTo(User);
Thing.addHook("beforeValidate", async (thing) => {
  if (!thing.userId) {
    thing.userId = null;
  }
});

Thing.addHook("beforeUpdate", async (thing) => {
  console.log("*********************************************************");
  const thingsOwnedByUser = await Thing.findAll({
    where: { userId: thing.userId },
  });
  if (thing.userId && thingsOwnedByUser.length >= 3) {
    console.log("error");
    throw "ERROR: A user can only own a max of 3 items";
  }
  console.log("*********************************************************");
});

module.exports = {
  conn,
  User,
  Thing,
};
