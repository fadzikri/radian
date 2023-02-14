import {getEmojiRawDataVersion, createJSONEmojiVersion} from './versions/versions.js';
import {getEmojisPathTxt, createJSONEmojiPathTxt} from './paths/paths.js';
import {getEmojiTxt, createJSONEmoji} from './emojis/emojis.js';

setTimeout(() => getEmojiRawDataVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 10000);
setTimeout(() => getEmojisPathTxt(), 20000);
setTimeout(() => createJSONEmojiPathTxt(), 30000);
setTimeout(() => getEmojiTxt(), 40000);
setTimeout(() => createJSONEmoji(), 50000);
