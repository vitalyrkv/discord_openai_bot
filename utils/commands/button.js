import { SlashCommandBuilder } from '@discordjs/builders'

const buttonCommand = new SlashCommandBuilder()
    .setName('button')
    .setDescription('Testing button command')

export default buttonCommand.toJSON()