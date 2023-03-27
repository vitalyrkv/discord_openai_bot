import { SlashCommandBuilder } from '@discordjs/builders'

const usersCommand = new SlashCommandBuilder()
.setName('users')
.setDescription('users cmd')
.addUserOption(option => option
    .setName('user')
    .setDescription('testing user'))

export default usersCommand.toJSON()