const expressions = [
    {
        'Lvl': [
            {"subLvl": ['0+1', '0+0', '0+1+0']},
            {"subLvl": ['0+1', '0+0', '0+1+0']},
            {"subLvl": ['0+1', '0+0', '0+1+0']}
        ]
    },
    {
        'Lvl': [
            {"subLvl": ['1+0*1', '1*0+1*0', '1+0+0*1']},
            {"subLvl": ['1+0*1', '1*0+1*0', '1+0+0*1']},
            {"subLvl": ['1+0*1', '1*0+1*0', '1+0+0*1']}
        ]
    },
    {
        'Lvl': [
            {"subLvl": ["1+1*(0+0)+!1", '!(0*1)*1', '1*1*1*!0']},
            {"subLvl": ["1+1*(0+0)+!1", '!(0*1)*1', '1*1*1*!0']},
            {"subLvl": ["1+1*(0+0)+!1", '!(0*1)*1', '1*1*1*!0']}
        ]
    }
]
console.log(expressions)

let currentLevel = 0; // Начальный уровень
let currentSubLevel = 0 //Начальный подуровень

// function checkExpressionsCompetition(bool, lvl = currentLevel, subLvl = currentSubLevel) {
//     console.log(currentSubLevel, expressions[lvl].Lvl[subLvl].subLvl.length-1)
//     if (currentSubLevel < expressions[lvl].Lvl[subLvl].subLvl.length) {
//         if (bool) {
//             // Если текущий уровень завершен, переходим на следующий уровень
//             // currentLevel++;
//             increaseSubLevel()
//             // Обновляем интерфейс игры для нового уровня, например, обновляем задачи и текст
//             updateGameInterface();
//         }
//     } else{
//         currentSubLevel = 0
//         increaseLevel()
//         updateGameInterface()
//         checkLevelCompletion(true)
//     }
// }
function checkExpressionsCompetition(bool) {
    if (currentSubLevel < expressions[currentLevel].Lvl.length - 1) {
        if (bool) {
            increaseSubLevel();
            updateGameInterface();
        }
    } else {
        // Подуровни текущего уровня закончились, проверяем завершение последнего уровня
        if (currentLevel < expressions.length - 1) {
            setTimeout(() => {
                increaseLevel();
            }, 1000);
        } else {
            // Все уровни и подуровни завершены, можно завершить игру или выполнить другие действия
            document.querySelector('.example').innerHTML = 'Good Job'
        }
    }
}

function updateGameInterface() {
    expressionGeneration()
    // solveEx()
    booleanValue()
}

/**
 * Функция изменяет текстовое содержимое элемента с классом `chooseText${index}` при клике на него.
 * Если текст в элементе равен "?", он изменяется на "1". Если текст равен "0", он изменяется на "?".
 * В противном случае текст изменяется на "0".
 */
function booleanValue(index) {
    // Получаем элемент с текстом
    const displayText = document?.querySelector(`.chooseText${index}`);

    // Изменяем текст в соответствии с текущим значением
    if (displayText) {
        if (displayText?.textContent === "?") {
            displayText.textContent = "1";
        } else if (displayText?.textContent === "0") {
            displayText.textContent = "?";
        } else {
            displayText.textContent = "0";
        }
    }
}

/**
 * Функция генерирует HTML-код для заданных выражений на основе данных из массива expressions
 * и добавляет его в элемент с классом 'example'.
 */
function expressionGeneration(lvl = currentLevel, subLvl = currentSubLevel) {
    // Получаем ссылку на элемент с классом 'example'
    const exClass = document.querySelector('.example');

    // Получаем данные для генерации из массива expressions
    const data = expressions[lvl].Lvl[subLvl]?.subLvl;
    // Создаем HTML-код на основе данных с использованием метода map()
    const htmlCode = data?.map((el, idx) => {
        return `<article id="${idx}">
                <div class="exercise${idx}">${el}</div>
                <span class="sq">=</span>
                <div class="booleanText${idx}" onclick="booleanValue(${idx})">
                  <span class="chooseText${idx}">?</span>
                </div>
              </article>`;
    }).join("");

    // Устанавливаем сгенерированный HTML-код внутрь элемента с классом 'example'
    exClass.innerHTML = htmlCode;
}

// Вызываем функцию для генерации HTML-кода
expressionGeneration();


function checkValue(lvl = currentLevel, subLvl = currentSubLevel) {
    let allTasksCorrect = true; // Изначально считаем, что все задачи решены правильно

    expressions[lvl].Lvl[subLvl].subLvl.forEach((el, idx) => {
        const displayNumber = document.querySelector(`.exercise${idx}`).textContent;
        const displayEqual = document.querySelector(`.chooseText${idx}`).textContent;
        let solved = eval(displayNumber);
        if (solved !== +displayEqual) {
            allTasksCorrect = false; // Если хотя бы одна задача решена неправильно, устанавливаем флаг в false
        }
    });

    // После завершения цикла проверяем флаг и вызываем checkLevelCompletion с соответствующим значением
    checkExpressionsCompetition(allTasksCorrect)
    // checkLevelCompletion(allTasksCorrect);
}

// Определите общее количество подуровней и текущий уровень

// Получите элементы для обновления
const progressBar = document.querySelector('.progress');
const currentLevelElement = document.getElementById('current-level');
const remainingLevelsElement = document.getElementById('remaining-levels');

// Обновление информации о прогрессе
function updateProgress(lvl = currentLevel, subLvl = currentSubLevel) {
    const progressPercentage = (subLvl) / (expressions[lvl]?.Lvl[subLvl]?.subLvl.length) * 100;

    progressBar.style.width = `${progressPercentage}%`;

    currentLevelElement.textContent = `Уровень ${currentLevel + 1}`;
    remainingLevelsElement.textContent = `${currentSubLevel + 1}/${expressions[lvl].Lvl[subLvl]?.subLvl.length}`;
}

// Вызов функции для начальной настройки
updateProgress();

// Пример: Увеличение текущего уровня (вызывается по мере прохождения подуровня)
function increaseLevel() {
    if (currentLevel < expressions.length - 1) {
        currentLevel++;
        currentSubLevel = 0; // Сброс подуровня при переходе на новый уровень
        updateProgress();
        expressionGeneration();
    }
}

function increaseSubLevel() {
    if (currentSubLevel < expressions[currentLevel].Lvl.length - 1) {
        currentSubLevel++;
        updateProgress();
    } else {
        // Подуровни закончились, переходим на следующий уровень
        increaseLevel();
    }
}

// Пример: Уменьшение текущего уровня (вызывается при неудачном завершении подуровня)
// function decreaseLevel() {
//     if (currentLevel > 1) {
//         currentLevel--;
//         updateProgress();
//     } else {
//         alert('Вы уже находитесь на самом низком уровне!');
//     }
// }

/**
 * Функция для решения задач на основе данных из массива expressions для указанного уровня (по умолчанию уровень 0).
 * Решает каждое выражение и выводит результат в консоль.
 */
// function solveEx(lvl = currentLevel, subLvl = currentSubLevel) {
//     // Проверяем, существует ли уровень lvl в массиве expressions
//     if (lvl >= 0 && lvl < expressions.length) {
//         // Получаем данные для решения задач из массива expressions
//         const expressionsToSolve = expressions[lvl].subLvl[subLvl];
//
//         // Итерируемся по каждому выражению и решаем его
//         expressionsToSolve.forEach((el, idx) => {
//             // Получаем текст выражения из соответствующего элемента с классом 'exercise${idx}'
//             const displayNumber = document.querySelector(`.exercise${idx}`).textContent;
//
//             // Вычисляем значение выражения с помощью функции eval()
//             let solved = eval(displayNumber);
//
//             // Выводим результат решения в консоль
//             if (solved) {
//                 console.log(`Решение ${el} : ${solved}`);
//             } else {
//                 console.log(`Решение ${el} : Не удалось решить`);
//             }
//         });
//     } else {
//         document.querySelector('.example').innerHTML =
//             `
//             <div class="finish">
//                 Good Job
//             </div>
//             `
//         ;
//     }
// }
// Вызываем функцию для решения задач на уровне по умолчанию (уровень 0)
// solveEx();


// function factorial(n) {
//     if (n <= 0) {
//       return 1;
//     } else {
//       return n * factorial(n - 1);
//     }
//   }
//
// // Генерируем случайные значения для операндов (0 или 1)
// function generateRandomExpression() {
//     const operands = ['0', '1'];
//     const operators = ['+', '*'];
//
//     function generateOperand() {
//       return operands[Math.floor(Math.random() * operands.length)];
//     }
//
//     function generateOperator() {
//       return operators[Math.floor(Math.random() * operators.length)];
//     }
//
//     // Генерируем случайное выражение
//     const expression = [];
//     expression.push(generateOperand());
//
//     for (let i = 0; i < 3; i++) { // Максимальная длина выражения = 3 (можно изменить)
//       expression.push(generateOperator());
//       expression.push(generateOperand());
//     }
//
//     const randomExpression = expression.join('');
//     return randomExpression
//   }
//
//   // Генерируем и выводим случайное логическое выражение
//   const randomExpression = generateRandomExpression();
//   console.log(randomExpression);
//
//