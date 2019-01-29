#!/usr/bin/env node

const { version } = require('./package');

/**
 * Outputs help message
 */
function help() {
    console.log(`Password Generator. Version ${version}\n\n` +
        'Usage: ./passgen.js [<length> [<flags>]]\n\n' +
        '  length - password length (default: 8)\n' +
        '  flags - generator flags (default: "spbdlc"):\n' +
        '    s - symbols (!@#$%^&*"\'_)\n' +
        '    p - punctuation marks (.,:;)\n' +
        '    b - braces and parentheses (()[]{})\n' +
        '    d - digits (0-9)\n' +
        '    l - lowercase characters (a-z)\n' +
        '    c - capical characters (A-Z)\n');
}

/**
 * Generates password
 *
 * available flags:
 * s - symbols (!@#$%^&*"'_)
 * p - punctuation marks (.,:;)
 * b - braces and parentheses (()[]{})
 * d - digits (0-9)
 * l - lowercase characters (a-z)
 * c - capical characters (A-Z)
 *
 * @param {number} length - password length
 * @param {string} flags - generator flags 
 * @return {string}
 */
function generate(length = 8, flags = 'spbdlc') {
    let chars = '';

    if (flags.includes('s')) // symbols
        chars += '!@#$%^&*"\'_';
    
    if (flags.includes('p')) // punctuation marks
        chars += '.,:;';

    if (flags.includes('b')) // braces and parentheses
        chars += '()[]{}';

    if (flags.includes('d')) // digits
        chars += '0123456789';

    if (flags.includes('l'))
        chars += 'abcdefghijklmnopqrstuvwxyz';

    if (flags.includes('c'))
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';

    for (let i = 0; i < length; ++i)
        result += chars[Math.floor(Math.random() * chars.length)];

    return result;
}

/**
 * @param {number} argc - count of command line arguments
 * @param {Array<string>}  argv - command line arguments list
 * @return {number} - execution code
 */
function main(argc, argv) {
    const length = Number(argv[2]);
    const isNaN = Number.isNaN(length);

    if (argc > 2 && (isNaN || length <= 0))
        help();
    else
        console.log(generate(isNaN ? 8 : length, argv[3]));
    return 0;
}

return main(process.argv.length, process.argv);
