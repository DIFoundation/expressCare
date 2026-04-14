import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployEscrow = await deploy("Escrow", {
    from: deployer,
    log: true,
  });

  const deployMarketplace = await deploy("Marketplace", {
    args: [deployEscrow.address],
    from: deployer,
    log: true,
  });

  console.log('Setting Marketplace Address in Escrow Contract...')
  const escrow = await hre.ethers.getContractAt("Escrow", deployEscrow.address);
  const tx = await escrow.setMarketplace(deployMarketplace.address);
  await tx.wait();
  console.log('Marketplace Address set in Escrow Contract')

  console.log('New Marketplace Address:', await escrow.marketplace())

  const networkName = hre.network.name;

  console.log("=== Deployment Summary ===");
  console.log("Deployer:", deployer);
  console.log("Network:", networkName);
  console.log("Escrow contract:", deployEscrow.address);
  console.log("Marketplace contract:", deployMarketplace.address);
  console.log("==========================");
};
export default func;
func.id = "deploy_escrow_and_marketplace";
func.tags = ["Escrow", "Marketplace"];
