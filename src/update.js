import { getEmojiRawDataVersion, createJSONEmojiVersion } from "./versions/versions.js"
import { getEmojisPathTxt, createJSONEmojiPathTxt } from "./paths/paths.js"

setTimeout(() => getEmojiRawDataVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 10000);
setTimeout(() => getEmojisPathTxt(), 20000);
setTimeout(() => createJSONEmojiPathTxt(), 30000);