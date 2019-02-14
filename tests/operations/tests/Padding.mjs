/**
 * Padding tests
 *
 * @author dangfan [dangf09@gmail.com]
 * @copyright DANG Fan Copyright 2019
 * @license Apache-2.0
 */
import TestRegister from "../TestRegister";

TestRegister.addTests([
    {
        name: "Pad ANSI X9.23",
        input: "\x12\x34\x56\x78",
        expectedOutput: "\x12\x34\x56\x78\x00\x00\x00\x04",
        recipeConfig: [
            { "op": "Pad",
                "args": [8, "ANSI X9.23"] }
        ]
    },
    {
        name: "Pad PKCS#7",
        input: "\x12\x34\x56\x78",
        expectedOutput: "\x12\x34\x56\x78\x04\x04\x04\x04",
        recipeConfig: [
            { "op": "Pad",
                "args": [8, "PKCS#7"] }
        ]
    },
    {
        name: "Pad ISO/IEC 7816-4",
        input: "\x12\x34\x56\x78",
        expectedOutput: "\x12\x34\x56\x78\x80\x00\x00\x00",
        recipeConfig: [
            { "op": "Pad",
                "args": [8, "ISO/IEC 7816-4"] }
        ]
    },
    {
        name: "Pad ANSI X9.9",
        input: "\x12\x34\x56\x78",
        expectedOutput: "\x12\x34\x56\x78\x00\x00\x00\x00",
        recipeConfig: [
            { "op": "Pad",
                "args": [8, "ANSI X9.9"] }
        ]
    },
    {
        name: "Pad ANSI X9.9 (No need)",
        input: "\x12\x34\x56\x78\x12\x34\x56\x78",
        expectedOutput: "\x12\x34\x56\x78\x12\x34\x56\x78",
        recipeConfig: [
            { "op": "Pad",
                "args": [8, "ANSI X9.9"] }
        ]
    }
]);
