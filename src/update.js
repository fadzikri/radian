const {getHTMLEmojiVersion, createJSONEmojiVersion} = require('./versions/versions');
const {getHTMLEmojisPath, createJSONEmojiPath} = require('./paths/paths');
const {getHTMLEmojiText, createJSONEmojiText} = require('./emojis/emojis');

setTimeout(() => getHTMLEmojiVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 10000);
setTimeout(() => getHTMLEmojisPath(), 20000);
setTimeout(() => createJSONEmojiPath(), 30000);
setTimeout(() => getHTMLEmojiText(), 40000);
// setTimeout(() => createJSONEmojiText(), 50000);
