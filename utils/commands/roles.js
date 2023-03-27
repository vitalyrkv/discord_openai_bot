import { SlashCommandBuilder } from '@discordjs/builders'

const rolesCommand = new SlashCommandBuilder()
.setName('addrole')
.setDescription('Add a role')
.addRoleOption(option => option
    .setName('newrole')
    .setRequired(true)
    .setDescription('Adds a New Role'))

export default rolesCommand.toJSON()