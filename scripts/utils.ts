import { Interface, NamedFragment } from "ethers";


export function getInterfaceID<T extends Interface>(contractInterface: T) {

    let interfaceID: bigint = 0n;
    const functions = contractInterface.fragments.filter(fragment => fragment.type == 'function') as NamedFragment[];

    for (let i = 0; i < functions.length; i++) {
        const sighash = contractInterface.getFunction(functions[i].name)?.selector!
        interfaceID = interfaceID ^ BigInt(sighash)
    }

    return '0x' + interfaceID.toString(16)
}