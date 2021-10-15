const db = require("mongoose");

db.Promise = global.Promise;

async function connect(URL) {
	try {
		await db.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("DB conectada correctamente");
	} catch (error) {
		console.log("no se pudo conectar " + error);
	}
}
module.exports = {
	connect,
};
