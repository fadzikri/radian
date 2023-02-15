const {getHTMLEmojiVersion, createJSONEmojiVersion} = require('./versions/versions');
const {getHTMLEmojisPath, createJSONEmojiPath} = require('./paths/paths');
// const {getEmojiTxt, createJSONEmoji} = require('./emojis/emojis');

setTimeout(() => getHTMLEmojiVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 10000);
setTimeout(() => getHTMLEmojisPath(), 20000);
setTimeout(() => createJSONEmojiPath(), 30000);
// setTimeout(() => getEmojiTxt(), 40000);
// setTimeout(() => createJSONEmoji(), 50000);
