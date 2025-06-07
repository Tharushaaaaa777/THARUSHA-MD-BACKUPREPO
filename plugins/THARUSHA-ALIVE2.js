const { cmd, commands } = require('../command');
const config = require('../config');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime ,sleep } = require('../lib/functions')
const mono = "```"
const pakaya = "`"

    function detectPlatform() {
      if (process.env.REPL_ID) return 'Replit';
      if (process.env.HEROKU_APP_NAME) return 'Heroku';
      if (process.env.KOYEB_PROJECT_ID) return 'Koyeb';
      if (process.env.AWS_LAMBDA_FUNCTION_NAME) return 'AWS Lambda';
      if (process.env.VERCEL) return 'Vercel';
      if (process.env.RENDER) return 'Render';
      if (process.env.NETLIFY) return 'Netlify';
      if (process.env.WORKFLOW) return 'Workflow';
      if (process.env.FLYIO_APP_NAME) return 'Fly.io';
      return 'Unknown Platform';
    }
    const platformName = detectPlatform();

cmd({
      pattern: "alivetharusha",
      alias: ["online"],
      desc: "Chek Bot Alive",
      category: "main",
      react: "🌏",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
          const senderNumber = m.sender;
          const isGroup = m.isGroup || false;
 // System and memory information
          const uptime = runtime(process.uptime());
          const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
          const cpuArch = os.arch();
          const cpuCores = os.cpus().length;
          const systemType = os.type();
          const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

          // Custom message for Render platform
          let platformMessage = '';
          if (platformName === 'Render') {
              platformMessage = '\n🌟 You are currently hosting on Render! Enjoy seamless deployments.';
          }
          ///////status been sent//////

       await conn.sendMessage(from, {
          text: "*© ʜᴇʟʟᴏᴡ ᴡᴇʟᴄᴏᴍᴇ ᴍᴀɪɴ ᴍᴇɴᴜ ʙʏ    ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ (main owner) ᴇɴᴊᴏʏ ᴛʜᴇ ʙᴏᴛ ᴀɴᴅ ꜰᴏʟʟᴏᴡ ᴍʏ ᴄʜᴀɴɴᴇʟ 🙂*",
          contextInfo: {
            externalAdReply: {
              title: '𝐓𝐇𝐀𝐑𝐔𝐒𝐇𝐀-𝐌𝐃',
              body: 'ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴜꜱᴇʀ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ♡ .',
              thumbnail: { url: `https://i.ibb.co/x8q6HFr1/9862.jpg` }, // Thumbnail URL
              sourceUrl: 'https://whatsapp.com/channel/0029Vb9LTRHInlqISdCfln45', // Optional link
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        });
        
        let desc = `
 
 👋 🅷🅴🅻🅻🅾 ${pushname},
 
*╭──────────⊶*
*│ 🌏 ${pakaya}ɪ'ᴍ ᴀʟɪᴠᴇ ɴᴏᴡ...${pakaya}*
*╰─────────────⊶*
*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃🛠️ ${pakaya}ᴠᴇʀꜱɪᴏɴ:${pakaya} 1.0.0 ʙᴇᴛᴀ*
*┃📡 ${pakaya}ᴍᴇᴍᴏʀʏ:${pakaya}* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*┃⏱️ ${pakaya}ʀᴜɴᴛɪᴍᴇ:${pakaya}* ${runtime(process.uptime())}
*┗━━━━━━━━━━━━━━━━━━━━┛*

🌀 *ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ꜰᴜɴᴄᴛɪᴏɴꜱ*

*♡ ᴡᴇʟᴄᴏᴍᴇ ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʏᴏᴜ ᴄᴀɴ ᴅᴏᴡɴʟᴏᴀᴅ ᴠɪᴅᴇᴏ , ꜱᴏɴɢ ᴀɴᴅ ᴠᴀʀɪᴏᴜꜱ ᴠɪᴅᴇᴏ ᴛʜᴏᴜɢʜᴛ ᴛʜɪꜱ ʙᴏᴛ ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ᴏᴡɴᴇʀ ɪꜱ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ ᴡᴀɴɴɪᴀʀᴀᴄʜᴄʜɪ. ɪᴛ ᴀʟꜱᴏ ɢɪᴠᴇꜱ ʏᴏᴜ ᴛʜᴇ ᴀʙɪʟɪᴛʏ ᴛᴏ ꜱᴏʟᴠᴇ ᴛʜᴇ ɴᴇᴡ ʀᴇᴠᴏʟᴜᴛɪᴏɴ ɪɴ ᴛᴇᴄʜɴᴏʟᴏɢʏ ᴀɴᴅ ᴛᴇᴄʜɴᴏʟᴏɢʏ ᴘʀᴏʙʟᴇᴍꜱ ᴀɴᴅ ᴛʜᴇʀᴇ ɪꜱ ɢʀᴇᴀᴛ ᴘᴏᴛᴇɴᴛɪᴀʟ ʜᴇʀᴇ. ᴛʜɪꜱ ᴛᴇᴄʜɴᴏʟᴏɢʏ ɪꜱ ᴀʟꜱᴏ ʀᴇʟᴀᴛᴇᴅ ᴛᴏ ᴀʟʟ . . . 🫟*


🔢 *${pakaya}ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ,${pakaya}*

*1 | ʙᴏᴛ ᴏᴡɴᴇʀ ɪɴꜰᴏ ♯*
*2 | ɪɴꜰᴏᴍᴀᴛɪᴏɴꜱ ♯*

> *${pakaya}♯ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳${pakaya}*
`
 // Sending the image with caption
          const vv = await conn.sendMessage(from, {


          text: desc,
          contextInfo: {

          forwardingScore: 0,
          isForwarded: false,
          forwardedNewsletterMessageInfo: {
          newsletterName: 'ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ',
          newsletterJid: "120363411607943828@newsletter",
          },
          externalAdReply: {
              title: `ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ`,
              body: `ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ 👨‍💻`,
              thumbnailUrl: `https://i.ibb.co/x8q6HFr1/9862.jpg`,
              sourceUrl: `https://whatsapp.com/channel/0029Vb9LTRHInlqISdCfln45`,
              
mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':               
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/x8q6HFr1/9862.jpg`},caption: `
𝐓𝐇𝐀𝐑𝐔𝐒𝐇𝐀-𝐌𝐃 𝐨𝐰𝐧𝐞𝐫 𝐧𝐮𝐦𝐛𝐞𝐫,

🌀 https://wa.me/+94740326138?text=_ʜᴇʏ_ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ_ᴏᴡɴᴇʀ~/🌏

> *© 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳*

`,
contextInfo: {
            forwardingScore: 0,
            isForwarded: false,
            externalAdReply: {
                title: `ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ`,
                body: `👨‍💻 ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ 👨‍💻`,
                thumbnailUrl: `https://i.ibb.co/x8q6HFr1/9862.jpg`,  // Your logo URL
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });
                        break;
                    case '2':
    await conn.sendMessage(from,{image:{url: `https://i.ibb.co/x8q6HFr1/9862.jpg`},caption: `*👋🏻 HELLO ${pushname} This Is The Details About Me 🍃*

🌀 *ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ.*

 𝗡𝗔𝗠𝗘: *ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ.*
 𝗔𝗚𝗘: *17*
 𝗙𝗥𝗢𝗠: *ᴀɴᴜʀᴀᴅʜᴀᴘᴜʀᴀ*
        
> *© 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳*
 `,
contextInfo: {
            forwardingScore: 0,
            isForwarded: false,
            externalAdReply: {
                title: `ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ`,
                body: `ᴏᴡɴᴇʀ ᴛʜᴀʀᴜꜱʜᴀ ꜱᴀɴᴅɪᴘᴀ 👤`,
                thumbnailUrl: `https://i.ibb.co/x8q6HFr1/9862.jpg`,  // Your logo URL
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });

                        

                        break;
                    default:
                        reply("Invalid option. Please select a valid option ❗");
                }

            }
        });
       /* await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Lakshanteach/Voice/raw/refs/heads/main/SHADOW%20MOVIE%20X%20KILAR%20ALIVE%20ALIVE%20%E2%9C%98.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });*/

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
