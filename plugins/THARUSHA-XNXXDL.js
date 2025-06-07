const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');

cmd({
    pattern: "xnxx",
    desc: "Searches for a video and downloads the first result",
    use: ".xnxx <search_term>",
    react: "🎥",
    category: "downloads",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    const searchTerm = q.trim();
    if (!searchTerm) return reply("Please provide a search term! 🎥 Example: .xnxx sample video");

    await conn.sendMessage(from, {
        text: `🔍 Searching and downloading video, please wait...\n\n*Warning: Ensure content is appropriate!*`,
        contextInfo: {
            externalAdReply: {
                title: '👨‍💻 SHADOW-MD NEW TECHNOLOGY 👨‍💻',
                body: '©MADE BY LAKSHAN DAMAYANTHA👨‍💻',
                thumbnail: { url: `https://i.ibb.co/mcGKFZD/3769.jpg` },
                sourceUrl: 'https://whatsapp.com/channel/0029Vb1mgOeCXC3K15xnyF2z',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });

    try {
        const apiKey = process.env.GIFTED_API_KEY || 'gifted'; // Use environment variable for API key
        // Step 1: Search for videos
        const searchUrl = `https://api.giftedtech.web.id/api/search/xnxx?apikey=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
        const searchResponse = await fetchJson(searchUrl);

        if (!searchResponse || !searchResponse.data || searchResponse.data.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("No videos found for your search term.");
        }

        // Take the first result
        const firstVideo = searchResponse.data[0];
        const encodedUrl = encodeURIComponent(firstVideo.url);

        // Step 2: Fetch download link
        await conn.sendMessage(from, { text: `📥 Downloading "${firstVideo.title}", please wait...` });
        const downloadUrl = `https://api.giftedtech.web.id/api/download/xnxxdl?apikey=${apiKey}&url=${encodedUrl}`;
        const downloadResponse = await fetchJson(downloadUrl);

        if (!downloadResponse || !downloadResponse.data || !downloadResponse.data.url) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply('Error: Could not retrieve video download link.');
        }

        // Step 3: Send the video
        const videoUrl = downloadResponse.data.url; // Adjust based on API response
        await conn.sendMessage(
            from,
            { video: { url: videoUrl }, caption: `*🎥 ${firstVideo.title} downloaded successfully!*`, mimetype: 'video/mp4' },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message || 'Failed to search or download video. Please try again.'}`);
    }
});

module.exports = {};
