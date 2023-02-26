const {getHTMLEmojiVersion, createJSONEmojiVersion} = require('./versions/versions');
const {getHTMLEmojisPath, createJSONEmojiPath} = require('./paths/paths');
const {getHTMLEmojiText, createJSONEmojiText, createJSONEmojiFileName} = require('./emojis/emojis');
const markLastUpdate = require('./last_update/last_update');

setTimeout(() => getHTMLEmojiVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 10000);
setTimeout(() => getHTMLEmojisPath(), 20000);
setTimeout(() => createJSONEmojiPath(), 35000);
setTimeout(() => getHTMLEmojiText(), 40000);
setTimeout(() => createJSONEmojiText(), 55000);
setTimeout(() => createJSONEmojiFileName(), 65000);
setTimeout(() => markLastUpdate(), 70000);
