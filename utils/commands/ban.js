import { SlashCommandBuilder } from '@discordjs/builders'

const banCommand = new SlashCommandBuilder()
.setName('banuser') 
.setDescription('Bans user from the guild')
.addSubcommandGroup(group => group
    .setName('banuser')
    .setDescription('select the type of ban')
    .addSubcommand(subcommand => subcommand
        .setName('temp_ban')
        .setDescription('bans a user for an x amount of time')
        .addUserOption(option =>
        option.setName('user').setDescription('Select user to ban').setRequired(true)    
    )
    .addIntegerOption(option => option
        .setName('time_for_ban')
        .setDescription('Enter the amount of days to be banned ')
        .setRequired(true))
    )
    .addSubcommand(subcommand => subcommand
        .setName('perm_ban')
        .setDescription('permanently bans user')
        .addUserOption((option) =>
        option.setName('user').setDescription('Select user to ban').setRequired(true),
    )))
    

export default banCommand.toJSON()