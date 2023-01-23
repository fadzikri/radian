import fs from "fs";
import Utils from "../../utils.js"
import pretty from "pretty";
import path from "path";

const baseURL = Utils.baseURL;
const dirSrc = `${path.resolve()}/src`;
const dirEmojiHTML = `${dirSrc}/emojis-path/${Utils.nameFileEmoji}`;
const versionJSON = `${dirSrc}/versions/emoji-versions.json`;

const getEmojisPathTxt = () => {
    fs.readFile(versionJSON, (err, data) => {
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

                    fs.writeFile(`${dirEmojiHTML}-${name[i]}.html`, pretty(textData), "utf-8", (err, data) => {
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