import { codeRepository } from '../repositories/code.repository';

/**
 * Generates a random code and inserts it into the database.
 *
 * @async
 * @function
 * @returns {Promise<string>} - The generated code.
 */
export async function getCode() {
    let code = generateRandomCode();

    // Check if the code exists in the database
    while (await codeRepository.codeExists(code)) {
        code = generateRandomCode();
    }

    // Insert the code into the database
    await codeRepository.insertCode(code);

    return code;
}

/**
 * Connects a code if it exists and is not in use.
 *
 * @async
 * @function
 * @param {string} code - The code to connect.
 * @returns {Promise<string | boolean>} - A message if the code is connected, false otherwise.
 */
export async function connectCode(code: string): Promise<string | boolean> {
    const exists = await codeRepository.codeExists(code);
    const inUse = await codeRepository.codeInUse(code);
    console.log ("exists: " + exists + ", inUse: " + inUse);
    if (exists && !inUse) {
        await codeRepository.updateCode(code, true);
        return "Connected!";
    } else {
        return false;
    }
}

/**
 * Generates a random 6-character code consisting of uppercase letters and digits.
 *
 * @function
 * @returns {string} - The generated code.
 */
function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log("random code:" + result);
    return result;
}