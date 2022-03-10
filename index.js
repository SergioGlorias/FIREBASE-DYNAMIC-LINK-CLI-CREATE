import { config } from "dotenv";
config();

import axios from "axios";
import validUrl from "valid-url";

import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Insira o link que quer encortar: ", async (link) => {
    if (!validUrl.isWebUri(link)) return console.log("Error: Você deve inserir um link válido!") && rl.close();

    try {
        let res = await axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_DYNAMIC_LINK_KEY}`, {
            dynamicLinkInfo: {
                domainUriPrefix: process.env.FIREBASE_DYNAMIC_LINK_DOMAIN,
                link: link
            },
            suffix: {
                option: "SHORT"
            }
        });
        
        console.log(`Link encurtado: ${res.data.shortLink}`);
    } catch (error) {
        console.error(error.response.data)
    } finally {
        rl.close();
    }
})