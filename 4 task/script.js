
import modalWindowsWork from './js/modules/modal.js'
import createMonster from './js/modules/monster.js'

const startGame = () => {

    modalWindowsWork();
    createMonster();
};

document.querySelector('.btn__modal').addEventListener('click', startGame);
