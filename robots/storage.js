const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const state = require("./state.js");

async function store() {
	const content = state.load();
	await uploadAudio();
	state.save(content);

	async function uploadAudio(audioPath, fileName) {
		const bucketName = "podream-audios";

		await storage.bucket(bucketName).upload(content.audioPath);

		content.gcsUri = `gs://${bucketName}/${content.fileName}`;
	}
}

module.exports = store;
