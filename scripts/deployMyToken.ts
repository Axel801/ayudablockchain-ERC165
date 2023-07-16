import { ethers } from 'hardhat'

async function main() {
    const myToken = await ethers.getContractFactory('MyToken').then(async (factory) => await factory.deploy())

    await myToken.waitForDeployment()

    console.log(
        `HelloWorld deployed to ${await myToken.getAddress()}`
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
