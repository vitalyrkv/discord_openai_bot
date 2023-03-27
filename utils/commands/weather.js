import { SlashCommandBuilder } from '@discordjs/builders'

const weatherCommand = new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get current weather')
        .addStringOption(option => option.setName('city').setDescription('Type in the city to get the weather').setRequired(true))

export default weatherCommand.toJSON()