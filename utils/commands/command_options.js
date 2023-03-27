import { SlashCommandBuilder } from '@discordjs/builders'

const orderCommand = new SlashCommandBuilder()
        .setName('order')
        .setDescription('Order menu')
        .addStringOption(option => option.setName('food').setDescription('Select the food you would like').setRequired(true).setChoices({
            name: 'Cake',
            value: 'cake'
        },
        {
            name: 'Ice-Cream',
            value: 'ice cream'
        },
        {
            name: 'Pizza',
            value: 'pizza'
        })).addStringOption(option => option.setName('drink').setDescription('Select the drink you would like').setRequired(true).setChoices({
            name: 'Water',
            value: 'water'
        },
        {
            name: 'Ginger Ale',
            value: 'ginger ale'
        },
        {
            name: 'OJ',
            value: 'Orange Juice'
        }))

export default orderCommand.toJSON()