import { Dirs, Utils } from "../../utils.js";
import fs from "fs";
import emojiRegex from "emoji-regex";


const baseURL = Utils.baseURL;
const dirEmojiPath = `${Dirs.dirEmoji}/${Utils.nameFileEmoji}`;
const filenameEmojiPath = `${Dirs.dirPath}/${Utils.nameFileEmojiPath}.json`;
const filenameEmoji = `${Dirs.dirVersion}/${Utils.nameFilename}.json`;


const getEmojiTxt = () => {
    const emojisVersionRaw = fs.readFileSync(filenameEmojiPath);
    const emojisVersionData = JSON.parse(emojisVersionRaw);

    emojisVersionData.forEach(async (data) => {
        try {
            const rawTXT = await fetch(`${baseURL}/${data.version}/${data.filename}`);
            const emojiFileTXT = await rawTXT.text();
            const fileEmojiName = `${dirEmojiPath}-${data.version}.txt`;
    
            fs.writeFile(fileEmojiName, emojiFileTXT, "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Emojis Text Downloaded!");
                }
            });
        } catch (err) {
            console.log(err);
            console.log("Error when fetch data from origin server.");
        }
    });
}

const createJSONEmoji = () => {
    const emojisNamesRaw = fs.readFileSync(filenameEmoji);
    const emojisNames = JSON.parse(emojisNamesRaw); 
    const emoji = [];

    emojisNames.forEach((data, i) => {
        const fileEmojiText = data.replace(/html/ig, "txt");
        const emojiObject = {};
        const emojiDataArray = [];

        emojiObject["version"] = fileEmojiText.replace(/emojis-|.txt/ig, "");

        try {
            let emojiTextData = fs.readFileSync(`${Dirs.dirEmoji}/${fileEmojiText}`, "utf-8");
            emojiTextData = emojiTextData.replace(/.+non-fully-qualified.+/g, "");
            emojiTextData = emojiTextData.replace(/.+minimally-qualified.+/g, "");
            emojiTextData = emojiTextData.replace(/.+unqualified.+/g, "");
            const regex = emojiRegex();
            
            for (const match of emojiTextData.matchAll(regex)) {
                emojiDataArray.push(match[0]);
            }
        } catch (err) {
            console.log("Error when create JSON file.");
        }

        emojiObject["emoji"] = emojiDataArray;
        emojiObject["unicode"] = null;

        emoji.push(emojiObject);
    });

    fs.writeFile(`${Dirs.dirEmoji}/${Utils.nameFileEmoji}.json`, JSON.stringify(emoji), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Emojis JSON Created!");
        }
    })
}

export { getEmojiTxt, createJSONEmoji };