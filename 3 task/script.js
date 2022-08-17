document.addEventListener("DOMContentLoaded", () => {

    //модальное окно-заглушка
    document.querySelector('.btn__modal').addEventListener('click', () => {
        document.querySelector('.modal').classList.add('closed');
        document.querySelector('.header').classList.remove('closed');
        document.querySelector('.main').classList.remove('closed');
        startGame();
    });

    function startGame () {
        // компьютер придумывает число
        function RandomNumber (min, max) {
            let rand = Math.floor(min + Math.random() * (max + 1 - min)); // загадываем "длину" числа

            //получаем число компьютера (initialNumber)
            const initialNumber = (makingNumber = rand => {
                let numArray = [];

                for(let i = 0; i < rand; i++) {
                    let n = Math.floor(Math.random() * 10);
                    if(!numArray.includes(n) & n !== 0){
                        numArray.push(n);
                    } else {
                        i--;
                }}
                return Number(numArray.join(''));
            })(rand);

            return initialNumber;
        };

        let initialNumber = RandomNumber(3, 6);
        let hiddenInitialNumber = initialNumber.toString().replace(/\d/g, '*'); //скрываем число загаданное компьютером
        let numberPlace = document.querySelector('.computer__number-span');
        numberPlace.textContent = hiddenInitialNumber;

        let numberCoincide = { total: 0, nums: ''}; //для корректного отображения совпавших и угаданных чисел
        let numberCorrect = { total: 0, nums: ''};

        let attempts = 5;  //количество попыток
        let attemptsField = document.querySelector('.attemptsLeft__span');
        attemptsField.textContent = attempts;

        const hasOnlyDigits = (v) => /^\d+$/.test(v);


        // функция проверки соответствия числа юзера с числом компьютера

        checkTheNums = (inputValue) => {
            let inputArray = inputValue.toString().split('').map(int => parseInt(int, 10));
            let initialNumberArray = initialNumber.toString().split('').map(int => parseInt(int, 10));

            for(var i = 0; i < initialNumberArray.length; i++) {
                if (initialNumberArray[i] == inputArray[i]) {
                    let newhiddenInitialNumber = numberPlace.textContent.substring(0,i) + initialNumberArray[i] + hiddenInitialNumber.substring(i+1);
                    numberPlace.textContent = newhiddenInitialNumber;
                    numberCorrect.total++;
                    numberCorrect.nums = [...numberCorrect.nums, inputArray[i]];
                    document.querySelector('.computer__score-correct').textContent = `${numberCorrect.total}(${numberCorrect.nums})`;
                };

                if (initialNumberArray.includes(inputArray[i]) && initialNumberArray[i] !== inputArray[i]) {
                    numberCoincide.total++;
                    numberCoincide.nums = [...numberCoincide.nums, inputArray[i]];
                    document.querySelector('.computer__number-coincide').textContent = `${numberCoincide.total}(${numberCoincide.nums})`;
                };  
                    numberCorrect.total = 0;
                    numberCorrect.nums = '';
                    numberCoincide.total = 0;
                    numberCoincide.nums = '';
        }};


        document.querySelector('#userNumber').addEventListener('submit', function(e){ //обработчик события submit
            if(attemptsField.textContent > 0){
                e.preventDefault();
                var inputValue = Number(userNumber.querySelector('input').value);

                if(!hasOnlyDigits(inputValue) || !inputValue){   
                    alert('Вы ввели неправильное число! Минус один ход!'); 
                    attempts = attempts - 1;
                    attemptsField.textContent = attempts;         
                } else {
                    attempts = attempts - 1;
                    attemptsField.textContent = attempts;
                    checkTheNums(inputValue);
                };
            };

            if (!numberPlace.textContent.includes('*')) {   
                alert("Вы выиграли! Игра начнется сначала");
                window.location.reload();
            };

            if(attemptsField.textContent == 0 || (attemptsField.textContent == 0 && !numberPlace.textContent.includes('*')) ){
                alert("Вы проиграли! Игра начнется сначала");
                window.location.reload();
            };
        });
    };
})