const { REST, Routes } = require('discord.js');
require('dotenv').config();

// Bot configuration from environment variables
const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// Validate environment variables
if (!token || !clientId || !guildId) {
    console.error('❌ Missing required environment variables!');
    console.error('Please make sure BOT_TOKEN, CLIENT_ID, and GUILD_ID are set in your .env file');
    process.exit(1);
}

// Define slash commands
const commands = [
    {
        name: 'ping',
        description: 'Replies with BadgeBuddy here! Perfect for testing the bot.',
    },
    {
        name: 'hello',
        description: 'Get a friendly greeting from BadgeBuddy!',
    },
    {
        name: 'info',
        description: 'Get information about BadgeBuddy and the Active Developer Badge.',
    },
    {
        name: 'badge',
        description: 'Learn how to get the Discord Active Developer Badge!',
    },
];

// Create REST instance
const rest = new REST({ version: '10' }).setToken(token);

// Deploy commands function
async function deployCommands() {
    try {
        console.log('🚀 Started refreshing application (/) commands...');
        
        // Register commands to guild (faster for development)
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        
        console.log('✅ Successfully reloaded application (/) commands!');
        console.log(`📝 Registered ${commands.length} commands:`);
        commands.forEach(cmd => console.log(`   - /${cmd.name}: ${cmd.description}`));
        
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
        
        // Provide helpful error messages
        if (error.code === 50001) {
            console.error('💡 Make sure your bot has the "applications.commands" scope when inviting to server');
        } else if (error.code === 10062) {
            console.error('💡 Check if your CLIENT_ID is correct');
        } else if (error.rawError?.message?.includes('guild')) {
            console.error('💡 Check if your GUILD_ID is correct and the bot is in that server');
        }
    }
}

// Deploy global commands function (for production)
async function deployGlobalCommands() {
    try {
        console.log('🌍 Started refreshing global application (/) commands...');
        console.log('⚠️  Global commands can take up to 1 hour to update!');
        
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        
        console.log('✅ Successfully reloaded global application (/) commands!');
        
    } catch (error) {
        console.error('❌ Error deploying global commands:', error);
    }
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--global')) {
        deployGlobalCommands();
    } else {
        deployCommands();
    }
}

module.exports = { deployCommands, deployGlobalCommands };