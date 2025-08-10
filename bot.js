const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
require('dotenv').config();

// Bot configuration
const token = process.env.BOT_TOKEN;

// Validate token
if (!token) {
    console.error('❌ BOT_TOKEN is missing! Please check your .env file');
    process.exit(1);
}

// Create client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

// Bot ready event
client.once('ready', () => {
    console.log('🤖 BadgeBuddy is online and ready!');
    console.log(`📊 Logged in as ${client.user.tag}`);
    console.log(`🏠 Connected to ${client.guilds.cache.size} server(s)`);
    console.log(`👥 Serving ${client.users.cache.size} users`);
    
    // Set bot status
    client.user.setActivity('for /ping commands!', { type: ActivityType.Watching });
});

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
    // Only handle slash commands
    if (!interaction.isChatInputCommand()) return;

    const { commandName, user, guild } = interaction;
    
    console.log(`📝 Command /${commandName} used by ${user.tag} in ${guild?.name || 'DM'}`);

    try {
        switch (commandName) {
            case 'ping':
                await handlePingCommand(interaction);
                break;
                
            case 'hello':
                await handleHelloCommand(interaction);
                break;
                
            case 'info':
                await handleInfoCommand(interaction);
                break;
                
            case 'badge':
                await handleBadgeCommand(interaction);
                break;
                
            default:
                await interaction.reply({
                    content: '❓ Unknown command! Try `/ping`, `/hello`, `/info`, or `/badge`',
                    ephemeral: true
                });
        }
    } catch (error) {
        console.error('❌ Error handling interaction:', error);
        
        const errorMessage = 'Sorry, there was an error executing this command!';
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
        }
    }
});

// Command handlers
async function handlePingCommand(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#00ff88')
        .setTitle('🏓 Pong!')
        .setDescription('**BadgeBuddy here!** 🤖\n\nI\'m online and ready to help you get that Active Developer Badge!')
        .addFields(
            { name: '📡 Latency', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
            { name: '💓 API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'BadgeBuddy • Active Developer Badge Helper' });

    await interaction.reply({ embeds: [embed] });
}

async function handleHelloCommand(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#ff6b9d')
        .setTitle('👋 Hello there!')
        .setDescription(`Hey **${interaction.user.displayName}**! Nice to meet you!\n\nI'm BadgeBuddy, your friendly Discord bot companion. I'm here to help you get the Active Developer Badge by providing slash command interactions! 🎖️`)
        .addFields(
            { name: '🎯 My Purpose', value: 'Help you qualify for the Discord Active Developer Badge', inline: false },
            { name: '💡 Quick Tip', value: 'Use `/ping` anytime to test the bot and rack up command usage!', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Thanks for using BadgeBuddy!' });

    await interaction.reply({ embeds: [embed] });
}

async function handleInfoCommand(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#4a90e2')
        .setTitle('ℹ️ About BadgeBuddy')
        .setDescription('A lightweight Discord bot designed specifically to help developers earn the **Active Developer Badge** through slash command interactions.')
        .addFields(
            { name: '🤖 Bot Info', value: '• Built with discord.js v14\n• Supports slash commands\n• Lightweight and fast', inline: true },
            { name: '⚡ Commands', value: '• `/ping` - Test the bot\n• `/hello` - Get a greeting\n• `/info` - This message\n• `/badge` - Badge guide', inline: true },
            { name: '🎖️ Badge Requirements', value: '• Use slash commands in a Community server\n• Have an application with recent activity\n• Enable data usage for Discord improvements', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'BadgeBuddy • Made for the Active Developer Badge' });

    await interaction.reply({ embeds: [embed] });
}

async function handleBadgeCommand(interaction) {
    const embed = new EmbedBuilder()
        .setColor('#ffd700')
        .setTitle('🎖️ Active Developer Badge Guide')
        .setDescription('Here\'s everything you need to know about getting the Discord Active Developer Badge!')
        .addFields(
            { name: '✅ Requirements', value: '1. Create a Discord application\n2. Use slash commands in a Community server\n3. Enable telemetry in Discord settings\n4. Apply for the badge', inline: false },
            { name: '🏠 Community Server', value: 'Make sure you\'re using commands in a server with Community features enabled!', inline: false },
            { name: '📊 Telemetry', value: 'Go to User Settings > Privacy & Safety > Enable "Use data to improve Discord"', inline: false },
            { name: '🌐 Apply', value: 'Visit: discord.com/developers/active-developer', inline: false },
            { name: '💡 Pro Tip', value: 'Keep using `/ping` to ensure you have recent activity!', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Good luck getting your badge!' });

    await interaction.reply({ embeds: [embed] });
}

// Error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('👋 BadgeBuddy is shutting down...');
    client.destroy();
    process.exit(0);
});

// Login to Discord
client.login(token);