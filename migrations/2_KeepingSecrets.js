var game = artifacts.require("Game");

module.exports = async function(deployer){
   await deployer.deploy(game);
}