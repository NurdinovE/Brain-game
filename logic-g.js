const expressions = [
    //1
    {
        'Lvl': [
            {"subLvl": ['1']},
            {"subLvl": ['0']},
            {"subLvl": ['!0']},
            {"subLvl": ['!1']},
            {"subLvl": ['!1']}

        ]
    },
    //2
    {
        'Lvl': [
            {"subLvl": ['1 * 1']},
            {"subLvl": ['!0 * 1']},
            {"subLvl": ['!0 * 0']},
            {"subLvl": ['1 * 0']},
            {"subLvl": ['0 * 0']}
        ]
    },
    //3
    {
        'Lvl': [
            {"subLvl": ['1 * 1 * 1']},
            {"subLvl": ['!0 * 1 * 1']},
            {"subLvl": ['!0 * !0 * !0']},
            {"subLvl": ['1 * 0 * !0']},
            {"subLvl": ['0 * 0 * 1']}

        ]
    },
    //4
    {
        'Lvl': [
            {"subLvl": ['1 + 1']},
            {"subLvl": ['!0 + 1']},
            {"subLvl": ['!0 + 0']},
            {"subLvl": ['!1 + 0']},
            {"subLvl": ['0 + 0']}
        ]
    },
    //5
    {
        'Lvl': [
            {"subLvl": ['1 + 1 + 1']},
            {"subLvl": ['!0 + 1 + 0']},
            {"subLvl": ['!1 + 0 + !1']},
            {"subLvl": ['0 + 0 + !0']},
            {"subLvl": ['0 + 0 + 0']}
        ]
    },
    //6
    {
        'Lvl': [
            {"subLvl": ['1 * 1 + 0']},
            {"subLvl": ['!0 * 1 + 0']},
            {"subLvl": ['0 + 0 * 1']},
            {"subLvl": ['0 * 0 + 1']},
            {"subLvl": ['0 * !0 + 0']}
        ]
    },
    //7
    {
        'Lvl': [
            {"subLvl": ['!1 * !1 + 0']},
            {"subLvl": ['!0 * 1 + 0']},
            {"subLvl": ['!0 + 0 * !1']},
            {"subLvl": ['!0 * !0 + !0']},
            {"subLvl": ['0 + !0 * 0']}
        ]
    },
    //8
    {
        'Lvl': [
            {"subLvl": ['!1 * !1 + 0 * 1']},
            {"subLvl": ['1 + 1 + 1 * 0']},
            {"subLvl": ['!1 + 0 * !1 * 1']},
            {"subLvl": ['!1 * !0 + !0 + 0']},
            {"subLvl": ['!1 + !0 * 0 + 0']}
        ]
    },
    //9
    {
        'Lvl': [
            {"subLvl": ['(1 + 1) * !(0 + 0) * !0']},
            {"subLvl": ['1 * (0 + !0) * !0 + 0']},
            {"subLvl": ['0 + (!0 * 1) * 0 * 1']},
            {"subLvl": ['!0 * !0 + !(0 + 0 + 0)']},
            {"subLvl": ['0 + !0 * (0 * 1) + 0']}
        ]
    },
    //10
    {
        'Lvl': [
            {"subLvl": ['(0 + 0) * !(1 + 1) + !0 + 1 * 1']},
            {"subLvl": ['0 + !(1 * 1 + !0) * !0 + 0 * 1']},
            {"subLvl": ['!(0 + 0) * (!1 + 0) * (0 + 0 + !0)']},
            {"subLvl": ['0 * 0 + 1 + 1 + (!0 * !0 + !0)']},
            {"subLvl": ['(1 + 0 + !0) * 0 + !1 + !1 * 1']}
        ]
    },
]

let currentLevel = 0; // Начальный уровень
let currentSubLevel = 0; // Начальный подуровень
let score = 0; // Баллы игрока
let consecutiveWrongAnswers = 0; // Количество неправильных ответов подряд



function checkExpressionsCompetition(bool) {
    if (bool) {
        if (currentSubLevel < expressions[currentLevel].Lvl.length - 1) {
            increaseSubLevel();
            updateGameInterface();
        } else {
            if (currentLevel < expressions.length - 1) {
                alert(`New level ${currentLevel + 2}`);
                setTimeout(() => {
                    increaseLevel();
                    currentSubLevel = 0;
                    updateProgress();
                    expressionGeneration();
                }, 500);
            } else {
                // Все уровни и подуровни завершены, установите текст в элементе .example
                document.querySelector('.example').innerHTML = 'Good Job <br> You have completed all levels!!!';
                document.querySelector('#checkButton').remove();
            }
        }
    } else {
        alert("Incorrect answer.");
        currentSubLevel = 0;
        updateProgress();
        expressionGeneration();
    }
}

function updateGameInterface() {
    expressionGeneration()
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
            displayText.textContent = "true";
        } else if (displayText?.textContent === "false") {
            displayText.textContent = "?";
        } else {
            displayText.textContent = "false";
        }
    }
}

/**
 * Функция генерирует HTML-код для заданных выражений на основе данных из массива expressions
 * и добавляет его в элемент с классом 'example'.
 */
function expressionGeneration() {
    const exClass = document.querySelector('.example');

    const data = expressions[currentLevel].Lvl[currentSubLevel]?.subLvl;

    const htmlCode = data?.map((el, idx) => {
        return `<article id="${idx}">
            <div class="exercise${idx}">${el}</div>
            <span class="sq">=</span>
            <div class="booleanText${idx} booleanTextStyle" onclick="booleanValue(${idx})">
                <span class="chooseText${idx}">?</span>
            </div>
        </article>`;
    });

    exClass.innerHTML = htmlCode;
}


// Вызываем функцию для генерации HTML-кода
expressionGeneration();


function decreaseLevel() {
    if (currentLevel > 0) {
        currentLevel--;
        currentSubLevel = 0; // Сбрасываем подуровень при понижении уровня
        updateProgress();
        expressionGeneration();
    }
}


function checkValue() {
    console.log(`Before Check - currentLevel: ${currentLevel}, currentSubLevel: ${currentSubLevel}`);

    let allTasksCorrect = true;

    expressions[currentLevel].Lvl[currentSubLevel].subLvl.forEach((el, idx) => {
        const displayExpression = document.querySelector(`.exercise${idx}`).textContent;
        const displayResult = document.querySelector(`.chooseText${idx}`).textContent;
        let solved = eval(displayExpression);

        // Convert solved to false if it's 0
        if (solved === 0) {
            solved = false;
        }
        if (solved > 0) {
            solved = true;
        }

        let expectedResult = (displayResult === 'true');

        if (solved !== expectedResult) {
            allTasksCorrect = false;
        }
    });

    if (allTasksCorrect) {
        score++;
        if (score >= 5) {
            score = 0;
        }
        consecutiveWrongAnswers = 0;
    } else {
        consecutiveWrongAnswers++;
        score = 0;

        if (consecutiveWrongAnswers >= 3) {
            consecutiveWrongAnswers = 0;
            decreaseLevel();
        } else {
            currentSubLevel = 0;
            expressionGeneration();
        }
    }

    checkExpressionsCompetition(allTasksCorrect);

    console.log(`After Check - currentLevel: ${currentLevel}, currentSubLevel: ${currentSubLevel}`);
}


// Определите общее количество подуровней и текущий уровень

// Получите элементы для обновления
const progressBar = document.querySelector('.progress');
const currentLevelElement = document.getElementById('current-level');
const remainingLevelsElement = document.getElementById('remaining-levels');

// Обновление информации о прогрессе
function updateProgress() {
    const progressPercentage = (currentSubLevel + 1) / expressions[currentLevel]?.Lvl.length * 100;

    progressBar.style.width = `${progressPercentage}%`;

    currentLevelElement.textContent = `Уровень ${currentLevel + 1}`;
    remainingLevelsElement.textContent = `${currentSubLevel + 1}/${expressions[currentLevel]?.Lvl.length}`;
}


// Вызов функции для начальной настройки
updateProgress();

// Пример: Увеличение текущего уровня (вызывается по мере прохождения подуровня)
function increaseLevel() {
    if (currentLevel < expressions.length - 1) {
        currentLevel++;
        currentSubLevel = 0; // Сбрасываем подуровень при переходе на новый уровень
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