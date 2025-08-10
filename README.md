# 🤖 BadgeBuddy - Discord Active Developer Badge Helper

A lightweight Discord bot specifically designed to help you get the **Discord Active Developer Badge** through slash command interactions.

## 🎖️ What is the Active Developer Badge?

The Active Developer Badge is a special profile badge on Discord that shows you're an active bot developer. To qualify, you need to have a Discord application (bot) that has been used with slash commands in the past 30 days.

## ✨ Features

- **4 Useful Slash Commands**: `/ping`, `/hello`, `/info`, and `/badge`
- **Beautiful Embeds**: Rich, colorful responses that look professional
- **Badge Guide**: Built-in help for getting your Active Developer Badge
- **Error Handling**: Robust error handling with helpful messages
- **Easy Setup**: Simple configuration with environment variables

## 🚀 Quick Start

### Prerequisites
- Node.js 16.9.0 or higher
- A Discord account
- A Community Discord server (you can create one)

### 1. Discord Application Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it "BadgeBuddy"
3. Go to the "Bot" tab and create a bot
4. Copy the bot token (keep it secret!)
5. Note your Application ID from the "General Information" tab

### 2. Server Setup
1. Create a new Discord server (or use an existing one)
2. Go to Server Settings > Community and enable Community features
3. Complete the Community setup (rules, announcements, etc.)

### 3. Bot Installation
1. Clone or download this project
2. Copy `.env.example` to `.env`
3. Fill in your `.env` file:
   ```env
   BOT_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here
   GUILD_ID=your_server_id_here
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Deploy commands and start the bot:
   ```bash
   npm run deploy
   npm start
   ```

   Or do both at once:
   ```bash
   node index.js --deploy
   ```

### 4. Invite Bot to Server
1. In Discord Developer Portal, go to OAuth2 > URL Generator
2. Select scopes: `bot` and `applications.commands`
3. Select permissions: `Send Messages`, `Use Slash Commands`
4. Copy the generated URL and invite bot to your Community server

### 5. Test the Bot
- Use `/ping` in your server - you should get "BadgeBuddy here!"
- Try other commands: `/hello`, `/info`, `/badge`

### 6. Apply for Badge
1. Enable telemetry: Discord Settings > Privacy & Safety > "Use data to improve Discord" ✅
2. Visit [discord.com/developers/active-developer](https://discord.com/developers/active-developer)
3. Select your BadgeBuddy application
4. Choose your Community server
5. Submit application

## 📝 Commands

| Command | Description |
|---------|-------------|
| `/ping` | Test the bot - perfect for badge qualification! |
| `/hello` | Get a friendly greeting from BadgeBuddy |
| `/info` | Learn about BadgeBuddy and its features |
| `/badge` | Step-by-step guide to get the Active Developer Badge |

## 🛠️ Scripts

```bash
npm start          # Start the bot
npm run deploy     # Deploy slash commands to your server
npm run dev        # Start with nodemon for development
node index.js -h   # Show help information
```

## 📁 Project Structure

```
badgebuddy/
├── bot.js              # Main bot logic and command handlers
├── deploy-commands.js  # Slash command registration
├── index.js           # Application entry point
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Your Discord bot token | Yes |
| `CLIENT_ID` | Your Discord application ID | Yes |
| `GUILD_ID` | Your test server ID | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Development vs Production

- **Development**: Commands are registered to your specific server (faster updates)
- **Production**: Use `--global` flag to register commands globally (up to 1 hour delay)

## 🚨 Important Notes

1. **Community Server Required**: Badge qualification requires using commands in a Community-enabled server
2. **Telemetry**: Enable Discord's data usage in your privacy settings
3. **Recent Activity**: Use commands within 30 days of applying for the badge
4. **Token Security**: Never share your bot token or commit it to version control

## 🐛 Troubleshooting

### Common Issues

**"Missing required environment variables"**
- Make sure you've created a `.env` file with all required variables

**"Missing Access" error when deploying commands**
- Ensure your bot has the `applications.commands` scope when invited

**Commands not appearing**
- Try running `npm run deploy` again
- Make sure you're in the correct server where you deployed commands

**Badge application rejected**
- Ensure you're using commands in a Community server
- Check that telemetry is enabled in Discord settings
- Make sure you have recent command usage (within 30 days)

### Getting Help

If you're still having issues:
1. Check the console output for error messages
2. Verify all your IDs are correct (bot token, client ID, guild ID)
3. Make sure your bot has the right permissions in your server

## 📜 License

This project is licensed under the MIT License - feel free to modify and use it for your own badge application!

## 🎉 Success!

Once you've successfully used the bot and applied for the badge, you should see the Active Developer Badge on your Discord profile within a few days. Good luck! 🎖️