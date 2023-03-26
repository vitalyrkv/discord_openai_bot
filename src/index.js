import { Client, Routes } from 'discord.js'
import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import orderCommand from '../utils/command_options.js'
import geocode from '../utils/geocode.cjs'
const geocode1   =  geocode
import forecast from '../utils/forecast.cjs'
const forecast1   =  forecast


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
        const city  = interaction.options.getString('city')//extract the argument
        if(interaction.commandName==='weather'){
            geocode1(city, (error, { latitude, longitude } = {}) => {
                forecast1(latitude, longitude,  (error, { location, current }) => {
                    console.log('Error', error)
                    const reply = 'Weather for: '+location.name+', '+location.region+'.\n'+'It is '+current.temperature+' degrees and '+current.weather_descriptions
                    interaction.reply({ content: reply })
                })
            })
        }else if(interaction.commandName==='order'){
            const food = interaction.options.getString('food')
            const drink = interaction.options.getString('drink')
            interaction.reply({ content: `You ordered ${food} and ${drink}`})
        }
     }
})

async function main() {
        const commands = [orderCommand.toJSON()]
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
