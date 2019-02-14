/**
 * @author dangfan [dangf09@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import forge from "node-forge/dist/forge.min.js";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;

/**
 * Generate RSA Key Pair operation
 */
class GenerateRSAKeyPair extends Operation {

    /**
     * GenerateRSAKeyPair constructor
     */
    constructor() {
        super();

        this.name = "Generate RSA Key Pair";
        this.module = "Crypto";
        this.description = "RSA (Rivest\u2013Shamir\u2013Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission.";
        this.infoURL = "https://en.wikipedia.org/wiki/RSA_(cryptosystem)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Bits",
                type: "option",
                value: ["1024", "2048", "4096"],
                defaultIndex: 1
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const bits = +args[0];
        const k = await promisify(forge.pki.rsa.generateKeyPair)({bits: bits, workers: 0});
        return `${forge.pki.privateKeyToPem(k.privateKey)}
${forge.pki.publicKeyToPem(k.publicKey)}`;
    }

}

export default GenerateRSAKeyPair;
