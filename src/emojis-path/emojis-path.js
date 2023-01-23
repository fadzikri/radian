import fs from "fs";
import Utils from "../../utils.js"
import pretty from "pretty";
import path from "path";

const baseURL = Utils.baseURL;
const dirSrc = `${path.resolve()}/src`;
const dirEmoji = `${dirSrc}/emojis-path`;
const dirVersionJSON = `${dirSrc}/versions/emoji-versions.json`;

const getEmojisPathTxt = () => {
    fs.readFile(dirVersionJSON, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            const name = parsedData.versions;
            const links = parsedData.links;

            try {
                links.forEach(async (link, i) => {
                    const rawData = await fetch(`${baseURL}/${link}`);
                    const textData = await rawData.text();

                    fs.writeFile(`${dirEmoji}/emoji-${name[i]}.html`, pretty(textData), "utf-8", (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Emojis Paths HTML Downloaded!");
                        }
                    });

                })
            } catch (err) {
                console.log(err);
                console.log("Error when fetch data from origin server.");
            }
        }
    })
    
    
}

getEmojisPathTxt();