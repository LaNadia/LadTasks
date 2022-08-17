import {armorRenumerate} from './monster.js';
import { monsterStates } from './monster.js';
import createMonster from './monster.js';
import { randomAttack } from './monster.js';
import { checkWinner } from './modal.js';


const mageStates = {
    maxHealth: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        }
    ]
};


const insertMageStates = () => {
    document.querySelector('.mage__name span').textContent = mageStates.name;
    document.querySelector('.mage__health span').textContent = mageStates.maxHealth;
    document.querySelector('.mage__armor-phys span').textContent = mageStates.physicArmorPercents;
    document.querySelector('.mage__armor-mag span').textContent = mageStates.magicArmorPercents;
}

function addEventListeners () {
    document.querySelectorAll('.skill button').forEach((item, i) => {
        item.removeEventListener('click', (event) => mageAttack(event));
        
        if(!item.getAttribute('disabled')){         
         item.addEventListener('click', (event) => mageAttack(event));  
    }});
};

function createMage (difficulty) {

  let skills = document.querySelectorAll('.skill__info');
   
   for(let i = 0; i < mageStates.moves.length; i++){
      skills[i].innerHTML = `Физ. урон:<span class="skill__damage-phys">${mageStates.moves[i].physicalDmg}</span>
                Маг. урон:<span class="skill__damage-mag">${mageStates.moves[i].magicDmg}</span>
                Физ.броня:<span class="skill__armor-phys">${mageStates.moves[i].physicArmorPercents}</span>
                Маг.броня:<span class="skill__armor-mag">${mageStates.moves[i].magicArmorPercents}</span>
                Кулдаун: <span class="skill__cooldown">${mageStates.moves[i].cooldown}</span>`;
   };

    switch(difficulty) {
        case 'easy':
            mageStates.maxHealth = 15;
            mageStates.physicArmorPercents = 50;
            mageStates.magicArmorPercents = 50;
            insertMageStates();
            break;
        case 'medium':
            mageStates.maxHealth = 10;
            mageStates.magicArmorPercents = 50;
            insertMageStates();
            break;
        case 'hard':
            mageStates.maxHealth = 5;
            insertMageStates();
            break;
        default:
            return;
    };
};

const checkCooldown = () => {

    for (let i = 1; i < mageStates.moves.length; ++i){
     
        if(i % 2 == 0) {
            if(mageStates.moves[i].cooldown == 1){
                mageStates.moves[i].cooldown = 4;  
                // + unblock 
                document.querySelectorAll('.skill button')[i].removeAttribute('disabled');
            };

            if(document.querySelectorAll('.skill button')[i].getAttribute('disabled')){
                --mageStates.moves[i].cooldown;
            };
        };
        
        if(!(i % 2 == 0)){
            if(mageStates.moves[i].cooldown == 1){
                mageStates.moves[i].cooldown = 3; 
                 // + unblock 
                document.querySelectorAll('.skill button')[i].removeAttribute('disabled');
            };
            if(document.querySelectorAll('.skill button')[i].getAttribute('disabled')){
                --mageStates.moves[i].cooldown;
            }; 
        };
    };
};

const mageAttack = (event) => {
    let target = event.target.closest('button');
    
    if(target){
        let mageAttack = mageStates.moves[target.id];

        switch(true) {
            case target.id > 0 && !target.getAttribute('disabled'):
                // + block
                target.setAttribute('disabled', 'true')              
                break;
            default:
                break;
        };
        
        checkCooldown();

        document.querySelector('.versus__content').innerHTML =
            `<div class="versus__ability">
                Вы применяете способность: <span></span>
                и наносите монстру урон!
            </div>`;

         document.querySelector('.versus__content span').textContent = String(mageAttack.name);
       
         mageStates.physicArmorPercents = mageAttack.physicArmorPercents;
         mageStates.magicArmorPercents = mageAttack.magicArmorPercents;
         armorRenumerate(monsterStates.physicArmorPercents, mageAttack, monsterStates, 'phys');
         armorRenumerate(monsterStates.magicArmorPercents, mageAttack, monsterStates, 'mage');

         createMonster();
         insertMageStates();
         createMage();

         // проверка здоровья
         if(checkWinner() == 'continue') {
                setTimeout(randomAttack, 2000);
         };
    }
}


export default createMage;
export {mageStates};
export {insertMageStates};
export {mageAttack};
export {addEventListeners};
