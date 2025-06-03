const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "bbc",
    react: "📰",
    desc: "Fetches and sends the latest BBC news from the API",
    category: "news",
    use: ".bbc",
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send a loading reaction
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Fetch news from the API
        const response = await axios.get('https://lakiya-api-site.vercel.app/news/bbc');
        const newsData = response.data;

        // Check if API returned valid data
        if (!newsData || !Array.isArray(newsData) || newsData.length === 0) {
            await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
            return reply("🛑 No news data available from BBC at the moment!");
        }

        // Get the first news article (or you can loop for multiple)
        const article = newsData[0]; // Assuming API returns an array of articles
        const { title, description, url, image } = article;

        // Validate required fields
        if (!title || !url) {
            await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
            return reply("🛑 Invalid news data received from the API!");
        }

        // Prepare the message
        let message = `📰 *BBC News*\n\n📌 *Title*: ${title}\n`;
        if (description) message += `📝 *Description*: ${description}\n`;
        message += `🔗 *Link*: ${url}`;

        // Send the news with optional image
        if (image) {
            await conn.sendMessage(from, { 
                image: { url: image }, 
                caption: message 
            });
        } else {
            await conn.sendMessage(from, { text: message });
        }

        // Send a success reaction
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        // Handle errors
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        reply("🛑 An error occurred while fetching BBC news! Please try again later.");
        l?.(e); // Log the error for debugging if logger exists
    }
});
