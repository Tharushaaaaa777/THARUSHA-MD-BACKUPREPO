const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
const fetch = require('node-fetch');

cmd({
  pattern: "ytsearch",
  use: ".yts <query>",
  react: "🔎",
  desc: "Search YouTube and download Audio/Video",
  category: "main",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  const react = async (msgKey, emoji) => {
    try {
      await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
    } catch (e) {
      console.error("Reaction error:", e.message);
    }
  };

  try {
    if (!q) return reply("❌ *`ᴘʟᴇᴀꜱᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ʏᴛ ᴠɪᴅᴇᴏ/ᴀᴜᴅɪᴏ ɴᴀᴍᴇ.`*");

    const yt = await ytsearch(q);
    const results = yt.results.slice(0, 10);
    if (results.length === 0) return reply("❌ *`ɴᴏ ʀᴇꜱᴀᴜʟᴛ ꜰᴏᴜɴᴅ.`*");

    let list = "🔍 *`𝐘𝐎𝐔 𝐓𝐔𝐁𝐄 𝐒𝐄𝐀𝐑𝐂𝐇 𝐑𝐄𝐒𝐀𝐔𝐋𝐓𝐒.`*\n\n";
    results.forEach((v, i) => {
      list += `${i + 1}. *${v.title}*\n${v.url}\n\n`;
    });

    const listMsg = await conn.sendMessage(from, { text: list + "🔢 *`ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴀ ɴᴜᴍʙᴇʀ ᴄʜᴏᴏꜱᴇ ᴀ ʀᴇᴀᴜʟᴛ.`*" }, { quoted: mek });
    const listMsgId = listMsg.key.id;

    conn.ev.on("messages.upsert", async (update) => {
      const msg = update?.messages?.[0];
      if (!msg?.message) return;

      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
      const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
      if (!isReplyToList) return;

      const index = parseInt(text.trim()) - 1;
      if (isNaN(index) || index < 0 || index >= results.length) return reply("❌ *`ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴠᴀʟɪᴅ  ɴᴜᴍʙᴇʀ.`*");
      await react(msg.key, '✅');

      const chosen = results[index];

      const askType = await conn.sendMessage(from, {
        image: { url: chosen.thumbnail },
        caption: `*╭─────────────────⊶*
*│ 📜 𝚈𝙾𝚄𝚁 𝚂𝙴𝙻𝙴𝙲𝚃𝙾𝚁 𝙳𝙴𝚃𝙰𝙸𝙻𝚂.*
*╰─────────────────────⊶*
*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃*🎵 *ᴛɪᴛʟᴇ:* ${chosen.title}
*┃*⏳ *ᴅᴜʀᴀᴛɪᴏɴ:* ${chosen.duration}
*┃*👀 *ᴠɪᴇᴡꜱ:* ${chosen.views}
*┃*📅 *ᴘᴜʙʟɪꜱʜᴇᴅ:* ${chosen.ago}
*┃*👤 *ᴀᴜᴛʜᴏʀ:* ${chosen.author.name}
*┃*🔗 *ᴜʀʟ:* ${chosen.url}
*┗━━━━━━━━━━━━━━━━━━━━┛*

🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*

*1 | | ᴀᴜᴅɪᴏ ᴛʏᴘᴇ 🎧*
*2 | | ᴠɪᴅᴇᴏ ᴛʏᴘᴇ 🎥*

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`
      }, { quoted: msg });
      const typeMsgId = askType.key.id;

      conn.ev.on("messages.upsert", async (tUpdate) => {
        const tMsg = tUpdate?.messages?.[0];
        if (!tMsg?.message) return;

        const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
        const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
        if (!isReplyToType) return;

        const { title, duration, views, author, published, url: videoUrl, thumbnail } = chosen;
        await react(tMsg.key, tText.trim() === "1" ? '🎧' : tText.trim() === "2" ? '🎥' : '❓');

        if (tText.trim() === "1") {
          const audioData = await dy_scrap.ytmp3(chosen.url);
          const optMsg = await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption:
              `*╭───────────────⊶*\n` +
              `*│ 🎧 𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*\n`+
              `*╰─────────────────⊶*\n`+
              `*┏━━━━━━━━━━━━━━━━━━━━┓*\n`+
              `*┃*🎵 *ᴛɪᴛʟᴇ:* ${title}\n` +
              `*┃*⏳ *ᴅᴜʀᴀᴛɪᴏɴ:* ${duration}\n` +
              `*┃*👀 *ᴠɪᴇᴡꜱ:* ${views}\n` +
              `*┃*👤 *ᴀᴜᴛʜᴏʀ:* ${author.name || author}\n` +
              `*┃*📅 *ᴘᴜʙʟɪꜱʜᴇᴅ:* ${published}\n` +
              `*┃*🔗 *ᴜʀʟ:* ${videoUrl}\n` +
              `*┗━━━━━━━━━━━━━━━━━━━━┛*\n\n`+
              `🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*\n\n` +
              `*1 | | ᴀᴜᴅɪᴏ ᴛʏᴘᴇ 🎧*\n`+
              `*2 | | ᴠᴏɪᴄᴇ ɴᴏᴛᴇ*🎙️\n`+
              `*3 | | ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ 📂*\n\n`+
              `> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`

          }, { quoted: tMsg });
          const optMsgId = optMsg.key.id;

          conn.ev.on("messages.upsert", async (aUpdate) => {
            const aMsg = aUpdate?.messages?.[0];
            if (!aMsg?.message) return;

            const aText = aMsg.message?.conversation || aMsg.message?.extendedTextMessage?.text;
            const isReplyToAudio = aMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === optMsgId;
            if (!isReplyToAudio) return;

            const url = audioData?.result?.download?.url;
            if (!url) return reply("❌ *`ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜰᴀɪʟᴇᴅ....`*");
            await react(aMsg.key, '⬇️');

            switch (aText.trim()) {
              case "3":
                await conn.sendMessage(from, {
                  document: { url },
                  fileName: `${title}.mp3`,
                  caption: "*`ʜᴇʀᴇ ɪꜱ ᴛʜᴇ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ ᴏꜰ ʏᴏᴜʀ ᴀᴜᴅɪᴏ.`* 📂\n\n> *♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*",
                  mimetype: "audio/mpeg"
                }, { quoted: aMsg });
                break;
              case "1":
                await conn.sendMessage(from, {
                  audio: { url },
                  mimetype: "audio/mpeg"
                }, { quoted: aMsg });
                break;
              case "2":
                await conn.sendMessage(from, {
                  audio: { url },
                  mimetype: "audio/mpeg",
                  ptt: true
                }, { quoted: aMsg });
                break;
              default:
                await conn.sendMessage(from, { text: "❌ *`ɪɴᴠᴀʟɪᴅ ɪɴᴘᴜᴛ. ʀᴇᴘʟʏ ᴡɪᴛʜ 1,2,3...`*" }, { quoted: aMsg });
            }
          });

        } else if (tText.trim() === "2") {
          const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          const vUrl = data?.result?.download_url;
          if (!vUrl) return reply("❌ *`ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜰᴀɪʟᴇᴅ....`*");

          const vMsg = await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption:
              `*╭───────────────⊶*\n` +
              `*│ 🎧 𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*\n`+
              `*╰─────────────────⊶*\n`+
              `*┏━━━━━━━━━━━━━━━━━━━━┓*\n` +
              `*┃*🎵 *ᴛɪᴛʟᴇ:* ${title}\n` +
              `*┃*⏳ *ᴅᴜʀᴀᴛɪᴏɴ:* ${duration}\n` +
              `*┃*👀 *ᴠɪᴇᴡꜱ:* ${views}\n` +
              `*┃*👤 *ᴀᴜᴛʜᴏʀ:* ${author.name || author}\n` +
              `*┃*📅 *ᴘᴜʙʟɪꜱʜᴇᴅ:* ${published}\n` +
              `*┃*🔗 *ᴜʀʟ:* ${videoUrl}\n` +
              `*┗━━━━━━━━━━━━━━━━━━━━┛*\n\n`+
              `🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*\n\n` +
              `*1 | | ᴠɪᴅᴇᴏ ᴛʏᴘᴇ 🎥*\n`+
              `*2 | | ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ 📂*\n\n`+
              `> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`
          }, { quoted: tMsg });
          const vMsgId = vMsg.key.id;

          conn.ev.on("messages.upsert", async (vUpdate) => {
            const vRes = vUpdate?.messages?.[0];
            if (!vRes?.message) return;

            const vText = vRes.message?.conversation || vRes.message?.extendedTextMessage?.text;
            const isReplyToVideo = vRes?.message?.extendedTextMessage?.contextInfo?.stanzaId === vMsgId;
            if (!isReplyToVideo) return;

            const emoji = vText.trim() === "1" || vText.trim() === "2" ? '⬇️' : '❌';
            await react(vRes.key, emoji);

            switch (vText.trim()) {
              case "2":
                await conn.sendMessage(from, {
                  document: { url: vUrl },
                  fileName: `${title}.mp4`,
                  caption: "*`ʜᴇʀᴇ ɪꜱ ᴛʜᴇ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ ᴏꜰ ʏᴏᴜʀ ᴠɪᴅᴇᴏ.`* 📂\n\n> *♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*",
                  mimetype: "video/mp4"
                }, { quoted: vRes });
                break;
              case "1":
                await conn.sendMessage(from, {
                  video: { url: vUrl },
                  caption: "*`ʜᴇʀᴇ ɪꜱ ᴛʜᴇ ʏᴏᴜʀ ᴠɪᴅᴇᴏ ꜰɪʟᴇ.`* 🎥\n\n> *♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*",
                  mimetype: "video/mp4"
                }, { quoted: vRes });
                break;
              default:
                await conn.sendMessage(from, { text: "❌ *`ɪɴᴠᴀʟɪᴅ ɪɴᴘᴜᴛ. ʀᴇᴘʟʏ ᴡɪᴛʜ 1,2`*" }, { quoted: vRes });
            }
          });

        } else {
          await conn.sendMessage(from, { text: "❌ *`ɪɴᴠᴀʟɪᴅᴇ ɪɴᴘᴜᴛ. 1ꜰᴏʀ ᴀᴜᴅɪᴏ / 2 ꜰᴏʀ ᴠɪᴅᴇᴏ...`*" }, { quoted: tMsg });
        }
      });
    });

  } catch (err) {
    console.error(err);
    reply("❌ *`Error:`* " + err.message);
  }
});
