import createMage from "./mage.js";
import { monsterAttack } from "./monster.js";
import { addEventListeners } from "./mage.js";


const modalWindowsWork = () => {
    let modal = document.querySelector('.modal');
    let wrapper = document.querySelector('.wrapper');
    modal.innerHTML = '';
    modal.innerHTML = 
        `<div class="modal__content">
            <div class="modal__title">Выберите сложность</div>
            <button class="btn difficulty easy">Легко</button>
            <button class="btn difficulty medium">Средне</button>
            <button class="btn difficulty hard">Трудно</button>
        </div>`;

   const closeDifficultyModal = () => {
        modal.removeEventListener('click', modalWindowsWork);;
        modal.classList.add('closed');
        wrapper.classList.remove('closed');
    }

    modal.addEventListener("click", () => {
        switch(true){
            case event.target.classList.contains('easy') :
                createMage('easy');
                closeDifficultyModal();
                addEventListeners();
                monsterAttack();
                break;
            case event.target.classList.contains('medium') :
                createMage('medium');
                closeDifficultyModal();
                addEventListeners();
                monsterAttack();
                break;
            case event.target.classList.contains('hard') :
                createMage('hard');
                closeDifficultyModal();
                addEventListeners();
                monsterAttack();
                break;
            default:
                return;
        };
    });
    
};


const checkWinner = () => {
    let monsterHealth = document.querySelector('.monster__health span').innerHTML;
    let mageHealth = document.querySelector('.mage__health span').innerHTML;

    const showWinner = (message) => {
        document.querySelectorAll('.skill button').forEach((i) => i.setAttribute('disabled', 'true'))
        let modal = document.querySelector('.modal');
        modal.innerHTML = '';
        modal.innerHTML = 
            `<div class="modal__content">
                <div class="modal__title">${message}</div>
                <button class="btn btn__modal">Начать новую битву</button>
            </div>`;
        
        setTimeout(() => {modal.classList.remove('closed')}, 3000);
        document.querySelector('.btn__modal').addEventListener('click', () => {location.reload()});
     };

     if(monsterHealth <= 0) {
        showWinner('Вы победили монстра!');
     } else if(mageHealth <= 0) {
        showWinner('Монстр победил!');
     } else if(monsterHealth > 0 && mageHealth > 0) {
        return 'continue';
     };
};


export default modalWindowsWork;
export {checkWinner};
