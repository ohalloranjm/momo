const icon = require('../settings/icon.js');
const { EmbedBuilder, Embed } = require('discord.js');
const { STATS } = require('../game_pieces');

class Roll {
    constructor(action) {
        // roll 2d6 and add the results
        if (action) this.trigger = `You **${action}.**`;
        this.dice = [ 1 + Math.floor(6 * Math.random()), 1 + Math.floor(6 * Math.random()) ];
        this.total = this.dice[0] + this.dice[1];
        this.equation = `${icon.roll} (${this.dice[0]}, ${this.dice[1]}) `;
        this.totalModifier = 0;
    }

    _validateTier(validationKeys) {

        if (!this.tier) return false;
        if (!validationKeys.length) return true;

        const keyLookup = {
            hit: ['part', 'full'],
            full: ['full'],
            part: ['part'],
            miss: ['miss']
        }

        // if any one of the validation keys matches this.tier, return true; else, false
        return validationKeys.reduce((valid, key) => valid || keyLookup[key].includes(this.tier), false);
    }

    addModifier(n, description) {
        if (typeof n === 'number') {
            this.equation += `${n < 0 ? `-` : `+`} ${Math.abs(n)} `;
            if (description) this.equation += `(${description}) `; 
            this.totalModifier += n;
        }
        return this;
    }

    sumTotal() {

        // coerce maximum modifier to a [-3, +4] range
        if (this.totalModifier < -3) {
            this.total -= 3;
            this.reminder = this.reminder || '';
            this.reminder += ' Total modifiers cannot be less than -3.';
        } else if (this.totalModifier > 4) {
            this.total += 4;
            this.reminder = this.reminder || '';
            this.reminder += ' Total modifiers cannot be greater than +4.';
        } else {
            this.total += this.totalModifier;
        }

        this.equation += `= ${this.total}. `

        // determine tier of success
        if (this.total < 7) {
            this.tier = 'miss';
        } else if (this.total < 10) {
            this.tier = 'part';
        } else {
            this.tier = 'full';
        }

        return this;
    }

    appendText(...params) {
        const validTiers = params.slice(0, params.length - 1);
        if (!this._validateTier(validTiers)) return this;
        const text = params[params.length - 1];
        this.result = this.result ? this.result + ' ' : '';
        this.result += `${text}`
        return this;
    }

    appendBullet(...params) {
        const text = params[params.length - 1];
        params[params.length - 1] = `\n* ${text}`;
        return this.appendText(...params);
    }

    // composeMessage() {
    //     let msg = this.trigger ? this.trigger + '\n\n' : '';
    //     msg += this.equation + '\n';
    //     if (this.reminder) msg += `-#${this.reminder}\n`;
    //     if (this.result) msg += `\n${this.result}`;
    //     return msg;
    // }

    composeMessage(title) {
        const roll = this;
        return { embeds: [
            new EmbedBuilder()
                .setColor(0x5555FF)
                .setTitle('Assess a Situation')
                .addFields(
                    { name: 'Roll', value: roll.equation },
                    { name: 'Result', value: roll.result },
                )
                .setTimestamp()
            ]
        }
    }

}

module.exports = Roll;