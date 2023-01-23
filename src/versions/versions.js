import fs from "fs";
import { load } from "cheerio";
import pretty from "pretty";
import Utils from "../../utils.js"
import path from "path";

const baseURL = Utils.baseURL;
const dirVersion = `${path.resolve()}/src/versions`;
const pathVersionHTML = `${dirVersion}/${Utils.nameFileVersion}.html`;
const pathVersionJSON = `${dirVersion}/${Utils.nameFileVersion}.json`;
const pathFilenameJSON = `${dirVersion}/${Utils.nameFilename}.json`

const getEmojiRawDataVersion = async () => {
    try {
        const rawData = await fetch(baseURL);
        const textData = await rawData.text();
    
        fs.writeFile(pathVersionHTML, pretty(textData), "utf-8", (err, data) => {
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
    return fs.readFile(pathVersionHTML, (err, data) => {
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
            const filenameVersions = [];

            arrayLinks.map((version) => {
                const ver = version.replace("/", "");
                arrayVersions.push(ver);
                filenameVersions.push(`${Utils.nameFileEmoji}-${ver}.html`);
            })

            const emojiVerJSON = {};

            emojiVerJSON["versions"] = arrayVersions;
            emojiVerJSON["links"] = arrayLinks;

            fs.writeFile(pathVersionJSON, JSON.stringify(emojiVerJSON), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Emoji Version JSON Created!");
                }
            });

            fs.writeFile(pathFilenameJSON, JSON.stringify(filenameVersions), "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Filename JSON Created!");
                }
            });
        }
    })
}

export { getEmojiRawDataVersion, createJSONEmojiVersion }