import { Client } from 'discord.js'
import { config } from 'dotenv'
config() //loads any environment var 

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']}) //allows to recieve events related to guilds and guild messages etc
const TOKEN = process.env.BOT_TOKEN

client.login(TOKEN)

//ready event is fired when bot is connected
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`) 
})

//fired when user sends a message
client.on('messageCreate', (message) => {
    console.log(message.content)
    console.log(message.createdAt.toDateString())
})

