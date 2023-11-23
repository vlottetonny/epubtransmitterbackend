import { codeRepository } from '../repositories/code.repository';

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

export async function connectCode(code: string): Promise<string | boolean> {
    const exists = await codeRepository.codeExists(code);
    const inUse = await codeRepository.codeInUse(code);

    if (exists && !inUse) {
        await codeRepository.updateCode(code, true);
        return "Connected!";
    } else {
        return false;
    }
}

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log("random code:" + result);
    return result;
}