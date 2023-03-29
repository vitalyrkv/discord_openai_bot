import { Client, Routes, TextInputStyle, User } from 'discord.js'
import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import OrderCommand from '../utils/commands/order.js'
import RolesCommand from '../utils/commands/roles.js'
import UsersCommand from '../utils/commands/user.js'
import ChannelsCommand from '../utils/commands/channel.js'
import WeatherCommand from '../utils/commands/weather.js'
import BanCommand from '../utils/commands/ban.js'
import RegisterCommand from '../utils/commands/register.js'
import geocode from '../utils/geocode.cjs' //fix this, make this nice with undici, look in docs
const geocode1   =  geocode
import forecast from '../utils/forecast.cjs'
import { ActionRowBuilder, ModalBuilder, SelectMenuBuilder, TextInputBuilder } from '@discordjs/builders'
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

        if(interaction.commandName==='weather'){ //improve the stuff below
            const city  = interaction.options.getString('city')//extract the argument
            geocode1(city, (error, { latitude, longitude } = {}) => {
                forecast1(latitude, longitude,  (error, { location, current }) => {
                    console.log('Error', error)
                    const reply = 'Weather for: '+location.name+', '+location.region+'.\n'+'It is '+current.temperature+' degrees and '+current.weather_descriptions
                    interaction.reply({ content: reply })
                })
            })
        }
        
        else if(interaction.commandName==='order'){
            const food = interaction.options.getString('food')
            const drink = interaction.options.getString('drink')
            const actionRowComponent = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder()
                    .setCustomId('food_options')
                    .setOptions([
                        { label: 'Cake', value: 'cake' },
                        { label: 'Pizza', value: 'pizza', },
                        { label: 'Sushi', value: 'sushi' }
                ])
            )
            const actionRowComponentDrinks = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder()
                    .setCustomId('drink_options')
                    .setOptions([
                        { label: 'Water', value: 'water 🔥'},
                        { label: 'Ginger Ale', value: 'ginger ale', },
                        { label: 'OJ', value: 'orange juice' }
                ])
            )
            interaction.reply({ components: [actionRowComponent.toJSON(), actionRowComponentDrinks.toJSON()] })
            //interaction.reply({ content: `You ordered ${food} and ${drink}`})
        }

        else if(interaction.commandName==='addrole') 
            interaction.reply({ content: 'New role added'})

        else if(interaction.commandName==='register'){
            const modal = new ModalBuilder()
                .setTitle('Register user form')
                .setCustomId('registerUserModal')
                .setComponents(
                    new ActionRowBuilder().setComponents( //looks like one ActionRow can only contain one TextInput
                        new TextInputBuilder()
                            .setLabel('Username')
                            .setCustomId('username')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Email')
                            .setCustomId('user_email')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Why should you be allowed to register? :D')
                            .setPlaceholder('Cuz Im such a gem! 💎')
                            .setCustomId('user_essay')
                            .setStyle(TextInputStyle.Paragraph)
                    ))
            interaction.showModal(modal)
        }
    }

    else if(interaction.isSelectMenu()){
        if(interaction.customId === 'food_options') interaction.reply({ content: `You selected ${interaction.values[0]} for food`})
        else if (interaction.customId === 'drink_options') interaction.reply({ content: `You selected ${interaction.values[0]} for drinks`})
    }
})

async function main() {
        const commands = [RegisterCommand, WeatherCommand, OrderCommand, RolesCommand, UsersCommand, ChannelsCommand, BanCommand]
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
