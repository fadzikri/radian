import path from "path";

class Utils {
    static apiURL = "https://apple.cyclic.app";
    static baseURL = "https://unicode.org/Public/emoji";
    static nameFilename = "filenames";
    static nameFileEmoji = "emojis";
    static nameFileEmojiPath = "emoji-paths";
    static nameFileVersion = "emoji-versions";
    static priorityEmojiFile = {
        high: "emoji-test.txt",
        medium: "emoji-sequences.txt",
        low: "emoji-data.txt"
    }
}

class Dirs {
    static dirSrc = `${path.resolve()}/src`;
    static dirVersion = `${this.dirSrc}/versions`;
    static dirPath = `${this.dirSrc}/paths`;
    static dirEmoji = `${this.dirSrc}/emojis`;
}

export { Utils, Dirs };
