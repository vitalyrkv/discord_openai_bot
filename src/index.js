import { Client, Routes } from 'discord.js'
import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
config() //loads any environment var 

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']}) //allows to recieve events related to guilds and guild messages etc
const TOKEN = process.env.BOT_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const rest = new REST({ version: '10'}).setToken(TOKEN)

//ready event is fired when bot is connected
client.on('ready', () => { console.log(`${client.user.tag} has logged in`) })

//fired when user sends a message
client.on('messageCreate', (message) => {
    console.log(message.content)
    console.log(message.createdAt.toDateString())
})

client.on('interactionCreate', (interaction) => {
     //check for the type of interaction, not to end up with wrong props and methods
     if(interaction.isChatInputCommand()){
        console.log('is input, very nice ')
        interaction.reply({ content: 'Testring /order command went thru!' })
     }
})

async function main() {
    const commands = [{
        name: 'order',
        description: 'Order something...' 
    }]
    try{
        console.log('Started refreshing application (/) commands')
        //put request to discord api to update a certain command
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        })
        client.login(TOKEN)
    } catch(err) { console.log(err) }
}

main()
