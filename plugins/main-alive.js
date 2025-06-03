const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive2",
    alias: ["status2", "online2"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, pushname }) => {
    try {
        const status = `👋 *🅷🅴🅻🅻🅾 ${pushname} 𝘸𝘦𝘭𝘤𝘰𝘮𝘦 𝘵𝘰 ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ 😗*

*╭─「 ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」*
*│*👾 *Bot*= *ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ*
*│*⏰ *Uptime*= ${runtime(process.uptime())}
*│*📂 *Ram*= ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*│*✒️ *Prefix*= . 
*│*🌀 *Host* = ${os.hostname()}
*│*⚡ *Version* = 1.0.0 ʙᴇᴛᴀ
*│*💨 *Mode* = [${config.MODE}]
*╰──────────●●►*

> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: status,
            
           /*contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                /*forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363411607943828@newsletter',
                    newsletterName: '𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 〽️𝙳',
                    serverMessageId: 143
                }
        }*/
            
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
