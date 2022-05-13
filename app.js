require('dotenv').config()
const fs = require("fs");
const config = {
    client_id: process.env.GRAPHEENE_CLIENT_ID,
    api_key: process.env.GRAPHEENE_API_KEY,
    service_token: process.env.GRAPHEENE_SERVICE_TOKEN
}

const Grapheene = require('@grapheene/grapheene')(config.client_id, config.api_key, config.service_token);


(async () => {
    // Generate 1GB.bin if it does not exist

    if (!fs.existsSync('./1GB.bin')) {
        console.log('Creating a 1GB file....\n')
        fs.writeFileSync('./1GB.bin', '')

        function randomString(len) {
            let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < len; i++) {
                let randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }

        while (!fs.existsSync('./1GB.bin') || fs.statSync('./1GB.bin').size < 1073741824) {
            fs.appendFileSync('./1GB.bin', randomString(4096));
        }
    }

    await Grapheene.setup()

    // Create a new key ring based off of the formation from earlier, we want this to be able to recall the name and have it unique
    Grapheene.kmf.ring.create('benchmarks')
        .then(async (ring) => {
            const member = await ring.addMember({
                name: 'aMember'
            })
            for (let x in ring.data) {
                await ring.delData(ring.data[x].uuid)
            }

            // Perform encryption
            console.time("sync");
            const data = await member.file().encrypt('./1GB.bin');
            console.log(data)
            console.timeEnd("sync")
            process.exit()
        });


})();

