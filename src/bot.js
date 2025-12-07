require('dotenv').config(); // Load environment variables
const { Client, GatewayIntentBits } = require('discord.js');
const { runMonteCarlo } = require('./services/simulatorService'); 
// ^ We are re-using your existing logic!

// 1. Setup the Bot Client
// We need specific "Intents" (permissions) to read messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent 
    ]
});

// 2. The "Listener" - Runs whenever a message is sent
client.on('messageCreate', async (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message starts with our command prefix "!predict"
    if (message.content.startsWith('!predict')) {
        
        // Parse the message: "!predict 29 7 29.5"
        // args becomes ["29", "7", "29.5"]
        const args = message.content.split(' ').slice(1);

        if (args.length < 3) {
            return message.reply('Usage: !predict [Mean] [StdDev] [Line]\nExample: !predict 29 7 29.5');
        }

        const mean = parseFloat(args[0]);
        const stdDev = parseFloat(args[1]);
        const line = parseFloat(args[2]);

        // Call your Monte Carlo Service
        // This is the SAME function you used for the API!
        const probability = runMonteCarlo(mean, stdDev, line);

        // Send the result back to Discord
        message.reply(`🏀 **Simulation Result:**\nBased on 10,000 simulations, there is a **${probability.toFixed(2)}%** chance the player goes OVER ${line}.`);
    }
});

// 3. Login
client.once('ready', () => {
    console.log(`Bot is online as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);