const fs = require("fs");
const path = require("path");
const { network, ethers } = require("hardhat");

const ABI_FILE_PATH = path.join("..", "client", "src", "constants", "abi.json");
const ACCOUNT_FILE_PATH = path.join(
  "..",
  "client",
  "src",
  "constants",
  "contractAddresses.json"
);

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating Front End...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Updating Front End Done!!!");
  }
};

async function updateAbi() {
  const betFootball = await ethers.getContract("BetFootball");
  console.log(betFootball.interface.format(ethers.utils.FormatTypes.json));
  fs.writeFileSync(
    ABI_FILE_PATH,
    betFootball.interface.format(ethers.utils.FormatTypes.json)
  );
  console.log("Updating ABI!!!");
}

async function updateContractAddresses() {
  const betFootball = await ethers.getContract("BetFootball");
  const chainId = network.config.chainId;
  const currentAddresses = JSON.parse(
    fs.readFileSync(ACCOUNT_FILE_PATH, "utf8")
  );
  currentAddresses[chainId] = [betFootball.address];
  fs.writeFileSync(ACCOUNT_FILE_PATH, JSON.stringify(currentAddresses));
  console.log("Updating Addresses!!!");
}

module.exports.tags = ["all", "frontend"];
