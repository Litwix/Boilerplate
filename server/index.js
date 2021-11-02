const { db } = require('./db');
const app = require('./app');
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    // Uncomment when you made db:
    await db.sync();
    app.listen(PORT, function () {
      console.log(`Listening for requests on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
