import { SlashCommandBuilder } from '@discordjs/builders'

const registerCommand = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register the user to the server')

export default registerCommand.toJSON()