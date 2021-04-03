const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { prefix } = require('../config.json');

module.exports = class legendJsClient extends Client {
	constructor(options) {
		super(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.prefix = prefix;
	}
};
