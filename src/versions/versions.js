import fs from "fs";
import { load } from "cheerio";
import pretty from "pretty";
import Utils from "../../utils.js"
import path from "path";

const baseURL = Utils.baseURL;
const dirVersion = `${path.resolve()}/src/versions`;
const pathHTML = `${dirVersion}/${Utils.nameFileVersion}.html`;
const pathJSON = `${dirVersion}/${Utils.nameFileVersion}.json`;

const getEmojiRawDataVersion = async () => {
    try {
        const rawData = await fetch(baseURL);
        const textData = await rawData.text();
    
        fs.writeFile(pathHTML, pretty(textData), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Emoji Version HTML Downloaded!");
            }
        });
    } catch (err) {
        console.log(err);
        console.log("Error when fetch data from origin server.");
    }
}

const createJSONEmojiVersion = () => {
    return fs.readFile(pathHTML, (err, data) => {
        if (err) {
            console.log("Error when reading raw HTML data.");
        } else {
            const $ = load(data);
            let links = $("td a");
            links = $(links).slice(1, links.length);

            const arrayLinks = [];

            links.each((i, link) => {
                arrayLinks.push($(link).text());
            });

            const arrayVersions = [];

            arrayLinks.map((version) => {
                const ver = version.replace("/", "");

                arrayVersions.push(ver);
            })

            const emojiVerJSON = {};

            emojiVerJSON["version"] = arrayVersions;
            emojiVerJSON["links"] = arrayLinks;

            fs.writeFile(pathJSON, JSON.stringify(emojiVerJSON), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Emoji Version JSON Created!");
                }
            });
        }
    })
}

export { getEmojiRawDataVersion, createJSONEmojiVersion }