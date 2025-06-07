const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// MP4 video download
// MP4 video download with options
cmd({ 
    pattern: "video", 
    react: "🎥", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        let ytmsg = `*╭─────────────⊶*
*│*🎥 *𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*
*╰─────────────────⊶*
*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃ 🎥 ᴛɪᴛʟᴇ:* ${yts.title}
*┃ ⏳ ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
*┃ 🔰 ᴠɪᴇᴡꜱ:* ${yts.views}
*┃ 👤 ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
*┃ 🔗 ᴜʀʟ:* ${yts.url}
*┗━━━━━━━━━━━━━━━━━━━━┛*

🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*

❶ | *ᴠɪᴅᴇᴏ ᴛʏᴘᴇ*🎥
➁ | *ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ* 📁

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;

       /* let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363419192353625@newsletter',
                newsletterName: '☈☟𝗧𝗛𝗔𝗥𝗨𝗦𝗛𝗔 𝗠𝗗',
                serverMessageId: 143
            }
        };*/

        // Send thumbnail with options
        const videoMsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg/*, contextInfo*/ }, { quoted: mek });

        conn.ev.on("messages.upsert", async (msgUpdate) => {
            const replyMsg = msgUpdate.messages[0];
            if (!replyMsg.message || !replyMsg.message.extendedTextMessage) return;

            const selected = replyMsg.message.extendedTextMessage.text.trim();

            if (
                replyMsg.message.extendedTextMessage.contextInfo &&
                replyMsg.message.extendedTextMessage.contextInfo.stanzaId === videoMsg.key.id
            ) {
                await conn.sendMessage(from, { react: { text: "📥", key: replyMsg.key } });

                switch (selected) {
                    case "2":
                        await conn.sendMessage(from, {
                            document: { url: data.result.download_url },
                            mimetype: "video/mp4",
                            fileName: `${yts.title}.mp4`,
                            caption: "*♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*",/*,
                            contextInfo*/
                            contextInfo: {
                                 externalAdReply: {
            title: yts.title.length > 25 ? `${yts.title.substring(0, 22)}...` : yts.title,
            body: "Join our WhatsApp Channel",
            mediaType: 1,
            thumbnailUrl: yts.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
            sourceUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            mediaUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            showAdAttribution: true,
            renderLargerThumbnail: true
        }
                            }
                        }, { quoted: replyMsg });
                        break;

                    case "1":
                        await conn.sendMessage(from, {
                            video: { url: data.result.download_url },
                            mimetype: "video/mp4",/*,
                            contextInfo*/
                            caption: "*♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*"
                        }, { quoted: replyMsg });
                        break;

                    default:
                        await conn.sendMessage(
                            from,
                            { text: "*`❌𝐈𝐍𝐕𝐀𝐋𝐈𝐃 𝐍𝐔𝐌𝐁𝐄𝐑 𝐑𝐄𝐏𝐋𝐘 𝐏𝐋𝐄𝐀𝐒𝐄 𝐕𝐀𝐋𝐈𝐃 𝐍𝐔𝐌𝐁𝐄𝐑 𝐑𝐄𝐏𝐋𝐘.(1 , 2)`*" },
                            { quoted: replyMsg }
                        );
                        break;
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

// MP3 song download
cmd({ 
    pattern: "song", 
    react: "🎧", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("Failed to fetch the audio. Please try again later.");
        }
        
        let ytmsg = `*╭───────────────⊶*
*│ 🎧 𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*
*╰─────────────────⊶*
*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃*🎵 *ᴛɪᴛʟᴇ:* ${yts.title}
*┃*⏳ *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
*┃*🔰 *ᴠɪᴇᴡꜱ:* ${yts.views}
*┃*👤 *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
*┃*🔗 *ᴜʀʟ:* ${yts.url}
*┗━━━━━━━━━━━━━━━━━━━━┛*

🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*

❶ | *ᴀᴜᴅɪᴏ ᴛʏᴘᴇ* 🫟
➁ | *ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ* 📁
❸ | *ᴠᴏɪᴄᴇ ɴᴏᴛᴇ*🎙️

> *㋛ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰  〽️Ｄ*`;
        
        /*let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363419192353625@newsletter',
                newsletterName: '☈☟𝗧𝗛𝗔𝗥𝗨𝗦𝗛𝗔 𝗠𝗗',
                serverMessageId: 143
            }
        };*/
        
        // Send thumbnail with caption only
  const songmsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg/*, contextInfo*/ }, { quoted: mek });

  
     
                     conn.ev.on("messages.upsert", async (msgUpdate) => {
        

                const mp3msg = msgUpdate.messages[0];
                if (!mp3msg.message || !mp3msg.message.extendedTextMessage) return;

                const selectedOption = mp3msg.message.extendedTextMessage.text.trim();

                if (
                    mp3msg.message.extendedTextMessage.contextInfo &&
                    mp3msg.message.extendedTextMessage.contextInfo.stanzaId === songmsg.key.id
                ) {
                
                            
                   await conn.sendMessage(from, { react: { text: "📥", key: mp3msg.key } });

                    switch (selectedOption) {
case "2":   

      
      
   await conn.sendMessage(from, { document: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", fileName: `${yts.title}.mp3`, caption: "*♯ `𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳`*", contextInfo: {
                                 externalAdReply: {
            title: yts.title.length > 25 ? `${yts.title.substring(0, 22)}...` : yts.title,
            body: "Join our WhatsApp Channel",
            mediaType: 1,
            thumbnailUrl: yts.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
            sourceUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            mediaUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            showAdAttribution: true,
            renderLargerThumbnail: true
        }
   }/*, contextInfo*/ }, { quoted: mp3msg });   
      
      
break;
case "1":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", contextInfo: {
                                 externalAdReply: {
            title: yts.title.length > 25 ? `${yts.title.substring(0, 22)}...` : yts.title,
            body: "Join our WhatsApp Channel",
            mediaType: 1,
            thumbnailUrl: yts.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
            sourceUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            mediaUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            showAdAttribution: true,
            renderLargerThumbnail: true
        }
}/*, contextInfo*/ }, { quoted: mp3msg });
break;
case "3":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", ptt: true, contextInfo: {
                                 externalAdReply: {
            title: yts.title.length > 25 ? `${yts.title.substring(0, 22)}...` : yts.title,
            body: "Join our WhatsApp Channel",
            mediaType: 1,
            thumbnailUrl: yts.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
            sourceUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            mediaUrl: 'https://whatsapp.com/channel/0029Vb4eZqo3bbV0lTGjFn2S',
            showAdAttribution: true,
            renderLargerThumbnail: true
        }
}/*, contextInfo*/ }, { quoted: mp3msg });
break;


default:
                            await conn.sendMessage(
                                from,
                                {
                                    text: "*`❌𝐈𝐍𝐕𝐀𝐋𝐈𝐃 𝐍𝐔𝐌𝐁𝐄𝐑 𝐑𝐄𝐏𝐋𝐘 𝐏𝐋𝐄𝐀𝐒𝐄 𝐕𝐀𝐋𝐈𝐃 𝐍𝐔𝐌𝐁𝐄𝐑 𝐑𝐄𝐏𝐋𝐘.(1-3)`*",
                                },
                                { quoted: mp3msg }
                            );
             }}});
           
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});
