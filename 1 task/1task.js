let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

// 1 способ: 
str = str.replace(/понедельник/igm, 'MONDAY')
        .replace(/вторник/igm, 'TUESDAY')
        .replace(/среда/igm, 'WEDNESDAY')
        .replace(/четверг/igm, 'THURSDAY')
        .replace(/пятница/igm, 'FRIDAY')
        .replace(/суббота/igm, 'SATURDAY')
        .replace(/воскресенье/igm, 'SUNDAY')

        

// 2 способ:

let arrayEng = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY','SATURDAY', 'SUNDAY'];
let arrayRus = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ'];

arrayRus.forEach((word,i) => {
    let reg = new RegExp(`${word}`, 'igm');
    str = str.replace(reg, arrayEng[i]);
});



