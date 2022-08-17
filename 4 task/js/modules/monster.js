
import {mageStates} from "./mage.js";
import { insertMageStates } from "./mage.js";
import { checkWinner } from './modal.js';


const modal = document.querySelector('.modal');
const monsterStates = {
    maxHealth: 10,
    name: "Лютый",
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
};

const createMonster = () => {
        document.querySelector('.monster__name span').textContent = monsterStates.name;
        document.querySelector('.monster__health span').textContent = monsterStates.maxHealth;
        document.querySelector('.monster__armor-phys span').textContent = monsterStates.physicArmorPercents;
        document.querySelector('.monster__armor-mag span').textContent = monsterStates.magicArmorPercents;
};

const armorRenumerate = (armor, attack, rival, password) => { 
    if(password == 'phys') {
        switch(armor){
            case 0:          
                  rival.maxHealth = rival.maxHealth - attack.physicalDmg;
                break;
            case 20:
                rival.maxHealth = (rival.maxHealth - (attack.physicalDmg/100 * 80)).toFixed();
                break;
            case 50:   
                 rival.maxHealth = rival.maxHealth - (attack.physicalDmg/2); 
                break;
            case 100:
                rival.maxHealth = rival.maxHealth;
                break;
            default:
                return;
        }
    };

    if(password == 'mage') {    
            switch(armor){
                case 0:
                    rival.maxHealth = rival.maxHealth - attack.magicDmg;
                    break;
                case 20:
                    rival.maxHealth = (rival.maxHealth - (attack.magicDmg/100 * 80)).toFixed();
                    break;
                case 50:
                    rival.maxHealth = rival.maxHealth - (attack.magicDmg/2);
                    break;
                case 100:
                    rival.maxHealth = rival.maxHealth;
                    break;
                default:
                    return;
            };
    };
};

const randomAttack = () => {
    let randomAbility = [Math.floor( Math.random() * 3)];
    let attack = monsterStates.moves[randomAbility];

    switch(true) {
        case randomAbility == 0:
            break;
        case randomAbility > 0 && attack.cooldown != 0:
            --attack.cooldown;
            randomAbility = [Math.floor( Math.random() * 3)];
            attack = monsterStates.moves[randomAbility];
            break;
        case randomAbility == 1 && attack.cooldown == 0:
            attack.cooldown = 3;
            break;
        case randomAbility == 2 && attack.cooldown == 0:
            attack.cooldown = 2;
            break;
    };
    
    document.querySelector('.versus__content').innerHTML =
        `<div class="versus__monsterAbility">
            Монстр применяет способность: <span></span>
            и наносит вам урон!
        </div>`;

     document.querySelector('.versus__content span').textContent = String(attack.name);
   
     monsterStates.physicArmorPercents = attack.physicArmorPercents;
     monsterStates.magicArmorPercents = attack.magicArmorPercents;
     armorRenumerate(mageStates.physicArmorPercents, attack, mageStates, 'phys');
     armorRenumerate(mageStates.magicArmorPercents, attack, mageStates, 'mage');
     
     createMonster();
     insertMageStates();

     // проверка здоровья
     checkWinner();
};

const monsterAttack = () => {
    modal.innerHTML = `
    <div class="modal__content">
        <div class="modal__title">Ознакомьтесь с характеристиками героев</div>
        <button class="btn btn__modal">Начать битву</button>
    </div>`;
    modal.classList.remove('closed');
    document.querySelector('.btn__modal').addEventListener('click', ()=> { 
        modal.innerHTML = `
        <div class="modal__content">
            <div class="modal__title">Монстр наносит удар!</div>
        </div>`;
        setTimeout(() => {modal.classList.remove('closed')}, 1000);
        setTimeout(() => {modal.classList.add('closed')}, 1000);
        randomAttack(), 
        {once: true}
    });
};


export default createMonster;
export {monsterAttack};
export {armorRenumerate};
export {monsterStates};
export {randomAttack}
