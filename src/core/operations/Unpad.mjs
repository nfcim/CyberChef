/**
 * @author dangfan [dangf09@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";

/**
 * Unpad operation
 */
class Unpad extends Operation {

    /**
     * Unpad constructor
     */
    constructor() {
        super();

        this.name = "Unpad";
        this.module = "Default";
        this.description = "Unpadding refers to removing the padding.";
        this.infoURL = "https://en.wikipedia.org/wiki/Padding_(cryptography)";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "Mode",
                type: "option",
                value: ["ANSI X9.23", "ISO 10126", "PKCS#7", "ISO/IEC 7816-4"]
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const [mode] = args;
        switch (mode) {
            case "ANSI X9.23":
            case "ISO 10126":
            case "PKCS#7":
            {
                const count = input[input.length - 1];
                return input.slice(0, input.length - count);
            }
            case "ISO/IEC 7816-4":
            {
                const padPosition = input.lastIndexOf(0x80);
                if (padPosition === -1) {
                    throw new OperationError("Invalid padded data");
                }
                return input.slice(0, padPosition);
            }
        }
        throw new OperationError("Unknown arg");
    }

}

export default Unpad;
