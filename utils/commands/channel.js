import { SlashCommandBuilder } from '@discordjs/builders'

const channelsCommand = new SlashCommandBuilder()
.setName('channels')
.setDescription('test channel')
.addChannelOption(option => option
    .setName('channels')
    .setRequired(true)
    .setDescription('testing channel description'))
    .addBooleanOption(option => option
        .setName('deletemsgs')
        .setDescription('Delete the messages'))
    .addIntegerOption(option => option
        .setName('age')
        .setDescription('Enter your age'))

export default channelsCommand.toJSON()