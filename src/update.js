const {getHTMLEmojiVersion, createJSONEmojiVersion} = require('./versions/versions');
const {getHTMLEmojisPath, createJSONEmojiPath} = require('./paths/paths');
const {getHTMLEmojiText, createJSONEmojiText, createJSONEmojiFileName} = require('./emojis/emojis');

setTimeout(() => getHTMLEmojiVersion(), 0);
setTimeout(() => createJSONEmojiVersion(), 8000);
setTimeout(() => getHTMLEmojisPath(), 18000);
setTimeout(() => createJSONEmojiPath(), 29000);
setTimeout(() => getHTMLEmojiText(), 35000);
setTimeout(() => createJSONEmojiText(), 48000);
setTimeout(() => createJSONEmojiFileName(), 55000);
