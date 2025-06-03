const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu2",
    alias: ["allmenu","fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*👋 ʜᴇʟʟᴏᴡ ʙᴏʏꜱ ᴀɴᴅ ɢɪʀʟꜱ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ʙᴏᴛ 🇱🇰

*╭─「 ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」*
*│*👾 *Bot*= *ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ*
*│*👤 *User*= ${pushname}
*│*☎️ *Owner Number*= +94740326138
*│*⏰ *Uptime*= ${runtime(process.uptime())}
*│*✒️ *Prefix*= . 
*╰──────────●●►*

╭━━〔 📥 *DOWNLOAD MENU* 〕━━➣
┃◈
┃◈ 🟦 facebook
┃◈ 📁 mediafire
┃◈ 🎵 tiktok
┃◈ 🐦 twitter
┃◈ 📷 insta
┃◈ 📦 apk
┃◈ 🖼️ img
┃◈ ▶️ tt2
┃◈ 📌 pins
┃◈ 🔄 apk2
┃◈ 🔵 fb2
┃◈ 📍 pinterest
┃◈ 🎶 spotify
┃◈ 🎧 play
┃◈ 🎧 play2
┃◈ 🔉 audio
┃◈ 🎬 video
┃◈ 📹 video2
┃◈ 🎵 ytmp3
┃◈ 📹 ytmp4
┃◈ 🎶 song
┃◈ 🎬 darama
┃◈ ☁️ gdrive
┃◈ 🌐 ssweb
┃◈ 🎵 tiks
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 👥 *GROUP MENU* 〕━━➣
┃◈
┃◈ 🔗 grouplink
┃◈ 🚪 kickall
┃◈ 🚷 kickall2
┃◈ 🚫 kickall3
┃◈ ➕ add
┃◈ ➖ remove
┃◈ 👢 kick
┃◈ ⬆️ promote
┃◈ ⬇️ demote
┃◈ 🚮 dismiss
┃◈ 🔄 revoke
┃◈ 👋 setgoodbye
┃◈ 🎉 setwelcome
┃◈ 🗑️ delete
┃◈ 🖼️ getpic
┃◈ ℹ️ ginfo
┃◈ ⏳ disappear on
┃◈ ⏳ disappear off
┃◈ ⏳ disappear 7D,24H
┃◈ 📝 allreq
┃◈ ✏️ updategname
┃◈ 📝 updategdesc
┃◈ 📩 joinrequests
┃◈ 📨 senddm
┃◈ 🏃 nikal
┃◈ 🔇 mute
┃◈ 🔊 unmute
┃◈ 🔒 lockgc
┃◈ 🔓 unlockgc
┃◈ 📩 invite
┃◈ #️⃣ tag
┃◈ 🏷️ hidetag
┃◈ @️⃣ tagall
┃◈ 👔 tagadmins
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🎭 *REACTIONS MENU* 〕━━➣
┃◈
┃◈ 👊 bully @tag
┃◈ 🤗 cuddle @tag
┃◈ 😢 cry @tag
┃◈ 🤗 hug @tag
┃◈ 🐺 awoo @tag
┃◈ 💋 kiss @tag
┃◈ 👅 lick @tag
┃◈ 🖐️ pat @tag
┃◈ 😏 smug @tag
┃◈ 🔨 bonk @tag
┃◈ 🚀 yeet @tag
┃◈ 😊 blush @tag
┃◈ 😄 smile @tag
┃◈ 👋 wave @tag
┃◈ ✋ highfive @tag
┃◈ 🤝 handhold @tag
┃◈ 🍜 nom @tag
┃◈ 🦷 bite @tag
┃◈ 🤗 glomp @tag
┃◈ 👋 slap @tag
┃◈ 💀 kill @tag
┃◈ 😊 happy @tag
┃◈ 😉 wink @tag
┃◈ 👉 poke @tag
┃◈ 💃 dance @tag
┃◈ 😬 cringe @tag
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🎨 *LOGO MAKER* 〕━━➣
┃◈
┃◈💡 neonlight
┃◈ 🎀 blackpink
┃◈ 🐉 dragonball
┃◈ 🎭 3dcomic
┃◈ 🇺🇸 america
┃◈ 🍥 naruto
┃◈ 😢 sadgirl
┃◈ ☁️ clouds
┃◈ 🚀 futuristic
┃◈ 📜 3dpaper
┃◈ ✏️ eraser
┃◈ 🌇 sunset
┃◈ 🍃 leaf
┃◈ 🌌 galaxy
┃◈ 💀 sans
┃◈ 💥 boom
┃◈ 💻 hacker
┃◈ 😈 devilwings
┃◈ 🇳🇬 nigeria
┃◈ 💡 bulb
┃◈ 👼 angelwings
┃◈ ♈ zodiac
┃◈💎 luxury
┃◈ 🎨 paint
┃◈ ❄️ frozen
┃◈ 🏰 castle
┃◈ 🖋️ tatoo
┃◈ 🔫 valorant
┃◈ 🐻 bear
┃◈ 🔠 typography
┃◈ 🎂 birthday
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 👑 *OWNER MENU* 〕━━➣
┃◈
┃◈ 👑 owner
┃◈ 📜 menu
┃◈ 📜 menu2
┃◈ 📊 vv
┃◈ 📋 listcmd
┃◈ 📚 allmenu
┃◈ 📦 repo
┃◈ 🚫 block
┃◈ ✅ unblock
┃◈ 🖼️ fullpp
┃◈ 🖼️ setpp
┃◈ 🔄 restart
┃◈ ⏹️ shutdown
┃◈ 🔄 updatecmd
┃◈ 💚 alive
┃◈ 🏓 ping
┃◈ 🆔 gjid
┃◈ 🆔 jid
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🎉 *FUN MENU* 〕━━➣
┃◈
┃◈ 🤪 shapar
┃◈ ⭐ rate
┃◈ 🤬 insult
┃◈ 💻 hack
┃◈ 💘 ship
┃◈ 🎭 character
┃◈ 💌 pickup
┃◈ 😆 joke
┃◈ ❤️ hrt
┃◈ 😊 hpy
┃◈ 😠 anger
┃◈ 😳 shy
┃◈ 💋 kiss
┃◈ 🧐 mon
┃◈ 😕 cunfuzed
┃◈ 🖼️ setpp
┃◈ ✋ hand
┃◈ 🏃 nikal
┃◈ 🤲 hold
┃◈ 🤗 hug
┃◈ 🏃 nikal
┃◈ 🎵 hifi
┃◈ 👉 poke
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🔄 *CONVERT MENU* 〕━━➣
┃◈
┃◈ 🏷️ sticker
┃◈ 🏷️ sticker2
┃◈ 😀 emojimix
┃◈ ✨ fancy
┃◈ 🖼️ take
┃◈ 🎵 tomp3
┃◈ 🗣️ tts
┃◈ 🌐 trt
┃◈ 🔢 base64
┃◈ 🔠 unbase64
┃◈ 010 binary
┃◈ 🔤 dbinary
┃◈ 🔗 tinyurl
┃◈ 🌐 urldecode
┃◈ 🌐 urlencode
┃◈ 🌐 url
┃◈ 🔁 repeat
┃◈ ❓ ask
┃◈ 📖 readmore
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🤖 *AI MENU* 〕━━➣
┃◈
┃◈ 🧠 ai
┃◈ 🤖 gpt3
┃◈ 🤖 gpt2
┃◈ 🤖 gptmini
┃◈ 🤖 gpt
┃◈ 🔵 meta
┃◈ 📦 blackbox
┃◈ 🌈 luma
┃◈ 🎧 dj
┃◈ 🧠 gpt4
┃◈ 🔍 bing
┃◈ 🎨 imagine
┃◈ 🖼️ imagine2
┃◈ 🤖 copilot
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 ⚡ *MAIN MENU* 〕━━➣
┃◈
┃◈ 🏓 ping
┃◈ 🏓 ping2
┃◈ 🚀 speed
┃◈ 📡 live
┃◈ 💚 alive
┃◈ ⏱️ runtime
┃◈ ⏳ uptime
┃◈ 📦 repo
┃◈ 👑 owner
┃◈ 📜 menu
┃◈ 📜 menu2
┃◈ 🔄 restart
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 🎎 *ANIME MENU* 〕━━➣
┃◈
┃◈ 🤬 fack
┃◈ ✅ truth
┃◈ 😨 dare
┃◈ 🐶 dog
┃◈ 🐺 awoo
┃◈ 👧 garl
┃◈ 👰 waifu
┃◈ 🐱 neko
┃◈ 🧙 megnumin
┃◈ 🐱 neko
┃◈ 👗 maid
┃◈ 👧 loli
┃◈ 🎎 animegirl
┃◈ 🎎 animegirl1
┃◈ 🎎 animegirl2
┃◈ 🎎 animegirl3
┃◈ 🎎 animegirl4
┃◈ 🎎 animegirl5
┃◈ 🎬 anime1
┃◈ 🎬 anime2
┃◈ 🎬 anime3
┃◈ 🎬 anime4
┃◈ 🎬 anime5
┃◈ 📰 animenews
┃◈ 🦊 foxgirl
┃◈ 🍥 naruto
╰━━━━━━━━━━━━━━━━━━━➣

╭━━〔 ℹ️ *OTHER MENU* 〕━━➣
┃◈
┃◈ 🕒 timenow
┃◈ 📅 date
┃◈ 🔢 count
┃◈ 🧮 calculate
┃◈ 🔢 countx
┃◈ 🎲 flip
┃◈ 🪙 coinflip
┃◈ 🎨 rcolor
┃◈ 🎲 roll
┃◈ ℹ️ fact
┃◈ 💻 cpp
┃◈ 🎲 rw
┃◈ 💑 pair
┃◈ 💑 pair2
┃◈ 💑 pair3
┃◈ ✨ fancy
┃◈ 🎨 logo <text>
┃◈ 📖 define
┃◈ 📰 news
┃◈ 🎬 movie
┃◈ ☀️ weather
┃◈ 📦 srepo
┃◈ 🤬 insult
┃◈ 💾 save
┃◈ 🌐 wikipedia
┃◈ 🔑 gpass
┃◈ 👤 githubstalk
┃◈ 🔍 yts
┃◈ 📹 ytv
╰━━━━━━━━━━━━━━━━━━━➣

> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender]/*,
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363411607943828@newsletter',
                        newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳',
                        serverMessageId: 143
                    }*/
                }
            },
            { quoted: mek }
        );

        // Send audio
        /*await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Tharushaaaaa777/THARUSHA-MD-DATABASE/raw/refs/heads/main/autovoice/AUD-20250323-WA0003.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });*/
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
