/**
 * @author dangfan [dangf09@gmail.com]
 * @copyright DANG Fan Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";

/**
 * Pad operation
 */
class Pad extends Operation {

    /**
     * Pad constructor
     */
    constructor() {
        super();

        this.name = "Pad";
        this.module = "Default";
        this.description = "Padding refers to a number of distinct practices which all include adding data to the beginning, middle, or end of a message prior to encryption.";
        this.infoURL = "https://en.wikipedia.org/wiki/Padding_(cryptography)";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "Block Size",
                type: "number",
                value: "8"
            },
            {
                name: "Mode",
                type: "option",
                value: ["ANSI X9.23", "ISO 10126", "PKCS#7", "ISO/IEC 7816-4", "ANSI X9.9"]
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const [blockSize, mode] = args;
        const padding = input.length === blockSize ? blockSize : (blockSize - input.length);
        switch (mode) {
            case "ANSI X9.23":
                return input.concat(Array.from({length: padding}, (v, k) => k === padding - 1 ? padding : 0));
            case "ISO 10126":
                return input.concat(Array.from({length: padding}, (v, k) => k === padding - 1 ? padding : Math.floor(Math.random() * 256)));
            case "PKCS#7":
                return input.concat(Array.from({length: padding}, () => padding));
            case "ISO/IEC 7816-4":
                return input.concat(Array.from({length: padding}, (v, k) => k === 0 ? 0x80 : 0));
            case "ANSI X9.9":
                if (padding === 8) {
                    return input;
                }
                return input.concat(Array.from({length: padding}, () => 0));
        }
        return [1];
    }

}

export default Pad;
