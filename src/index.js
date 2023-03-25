import { Client } from 'discord.js'
import { config } from 'dotenv'
config() //loads any environment var 

const client = new Client({ intents: ['Guilds', 'GuildMessages']}) //allows to recieve events related to guilds and guild messages
const TOKEN = process.env.BOT_TOKEN

console.log(TOKEN)
client.login(TOKEN)



