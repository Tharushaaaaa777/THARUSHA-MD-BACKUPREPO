const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

// Store the AI chat status for groups (on/off state)
let aiChatStatus = {};

// Command to handle .gemini on/off and manual AI chat
cmd({
    pattern: "gemini",
    alias: ["gemini"],
    react: "📑",
    desc: "AI chat control and manual query.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (q.toLowerCase() === "on") {
            if (!isGroup) return reply("This command can only be used in groups.");
            if (!isAdmins) return reply("Only group admins can enable AI chat.");
            aiChatStatus[from] = true;
            return reply("AI chat enabled for this group! The bot will now auto-respond to messages.");
        } else if (q.toLowerCase() === "off") {
            if (!isGroup) return reply("This command can only be used in groups.");
            if (!isAdmins) return reply("Only group admins can disable AI chat.");
            aiChatStatus[from] = false;
            return reply("AI chat disabled for this group.");
        } else if (q) {
            // Manual Gemini query
            let data = await fetchJson(`https://lakiya-api-site.vercel.app/ai/gemini?q=${encodeURIComponent(q)}`);
            return reply(`${data.result}\n\n> ꜱʜᴏɴᴜ x ᴍᴅ ʙʏ ʟᴀᴋꜱʜᴀɴ ᴅᴀᴍᴀʏᴀɴᴛʜᴀ 👨‍🔧`);
        } else {
            return reply("Please provide a query or use '.gemini on' or '.gemini off' to control AI chat.");
        }
    } catch (e) {
        console.log(e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});

// Auto-respond to messages in groups where AI chat is enabled
cmd({
    pattern: null, // No specific command pattern, listens to all messages
    on: "text", // Trigger on any text message
    fromMe: false, // Only respond to messages from others
    dontAddCommandList: true // Don't list this as a command
},
async (conn, mek, m, { from, quoted, body, isGroup, sender, reply }) => {
    try {
        // Check if AI chat is enabled for this group
        if (isGroup && aiChatStatus[from] && !m.isBot) {
            let data = await fetchJson(`https://lakiya-api-site.vercel.app/ai/gemini?q=${encodeURIComponent(body)}`);
            return reply(`${data.result}\n\n>  ® Auto AI Response ꜱʜᴏɴᴜ x ᴍᴅ ʙʏ ʟᴀᴋꜱʜᴀɴ ᴅᴀᴍᴀʏᴀɴᴛʜᴀ 👨‍🔧 `);
        }
    } catch (e) {
        console.log(e);
        // Silently fail to avoid spamming errors in group chat
    }
});
