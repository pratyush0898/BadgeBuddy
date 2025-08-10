#!/usr/bin/env node

/**
 * BadgeBuddy Discord Bot
 * Entry point for the application
 * 
 * This bot helps developers get the Discord Active Developer Badge
 * by providing slash command interactions in Community servers.
 */

console.log('🚀 Starting BadgeBuddy...');
console.log('📱 Discord Active Developer Badge Helper Bot');
console.log('─'.repeat(50));

// Load environment variables
require('dotenv').config();

// Check if we need to deploy commands first
const args = process.argv.slice(2);

if (args.includes('--deploy') || args.includes('-d')) {
    console.log('🔧 Deploying commands first...');
    const { deployCommands } = require('./deploy-commands');
    
    deployCommands().then(() => {
        console.log('✅ Commands deployed! Starting bot...\n');
        require('./bot');
    }).catch(error => {
        console.error('❌ Failed to deploy commands:', error);
        process.exit(1);
    });
} else if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🤖 BadgeBuddy - Discord Active Developer Badge Helper

Usage: node index.js [options]

Options:
  --deploy, -d    Deploy slash commands before starting the bot
  --help, -h      Show this help message

Environment Variables (create a .env file):
  BOT_TOKEN       Your Discord bot token
  CLIENT_ID       Your Discord application client ID  
  GUILD_ID        Your test server ID (Community server recommended)

Quick Start:
  1. Copy .env.example to .env and fill in your values
  2. Run: npm install
  3. Run: node index.js --deploy
  4. Use /ping in your Community server
  5. Apply for badge at: discord.com/developers/active-developer

Commands Available:
  /ping     - Test the bot (perfect for badge qualification)
  /hello    - Get a friendly greeting
  /info     - Learn about BadgeBuddy
  /badge    - Get badge application guide
`);
    process.exit(0);
} else {
    // Just start the bot
    require('./bot');
}