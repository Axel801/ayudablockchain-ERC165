import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { ethers } from 'hardhat'
import { IERC20__factory, MyInterface__factory, MyToken } from '../typechain-types'
import { getInterfaceID } from '../scripts/utils'

describe('MyToken Tests', () => {
    let myToken: MyToken


    async function deployFixture(): Promise<void> {
        myToken = await ethers
            .getContractFactory('MyToken')
            .then(async (contract) => await contract.deploy())
    }

    beforeEach(async () => {
        await loadFixture(deployFixture)
    })

    it('Check if MyToken supports IERC20', async () => {
        const IERC20 = IERC20__factory.createInterface()
        const IERC20InterfaceId = getInterfaceID(IERC20)

        expect(await myToken.supportsInterface(IERC20InterfaceId)).to.be.true;

    })

    it('Check totalSupply selector', async () => {
        const myInterface = MyInterface__factory.createInterface()
        const sighash = myInterface.getFunction('obtainSelector').selector
        expect(await myToken.obtainSelector()).to.be.equal(sighash)
    })
})