const expressions = [
    [
        '0+1',
        '0+0',
        '0+1+0'
    ],
    [
        '1+0*1',
        '1*0+1*0',
        '1+0+0*1'
    ],
    [
        "1+1*(0+0)+!1",
        '!(0*1)*1',
        '1*1*1*!0'
    ]
]

let currentLevel = 0; // Начальный уровень

function checkLevelCompletion(bool) {
    // Проверяем условие завершения текущего уровня

    if (currentLevel <= expressions.length) {
        if (bool) {
            // Если текущий уровень завершен, переходим на следующий уровень
            currentLevel++;

            // Обновляем интерфейс игры для нового уровня, например, обновляем задачи и текст
            updateGameInterface();

            // Проверяем, завершена ли игра

        }
    }
}

function updateGameInterface() {
    expressionGeneration()
    solveEx()
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
    if (displayText){
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
function expressionGeneration(lvl = currentLevel) {
    // Получаем ссылку на элемент с классом 'example'
    const exClass = document.querySelector('.example');

    // Получаем данные для генерации из массива expressions
    const data = expressions[lvl];

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

/**
 * Функция для решения задач на основе данных из массива expressions для указанного уровня (по умолчанию уровень 0).
 * Решает каждое выражение и выводит результат в консоль.
 */
function solveEx(lvl = currentLevel) {
    // Проверяем, существует ли уровень lvl в массиве expressions
    if (lvl >= 0 && lvl < expressions.length) {
        // Получаем данные для решения задач из массива expressions
        const expressionsToSolve = expressions[lvl];

        // Итерируемся по каждому выражению и решаем его
        expressionsToSolve.forEach((el, idx) => {
            // Получаем текст выражения из соответствующего элемента с классом 'exercise${idx}'
            const displayNumber = document.querySelector(`.exercise${idx}`).textContent;

            // Вычисляем значение выражения с помощью функции eval()
            let solved = eval(displayNumber);

            // Выводим результат решения в консоль
            if (solved) {
                console.log(`Решение ${el} : ${solved}`);
            } else {
                console.log(`Решение ${el} : Не удалось решить`);
            }
        });
    } else {
        document.querySelector('.example').textContent = 'Good Job';
    }
}


// Вызываем функцию для решения задач на уровне по умолчанию (уровень 0)
solveEx();


function checkValue(lvl = currentLevel) {
    let allTasksCorrect = true; // Изначально считаем, что все задачи решены правильно

    expressions[lvl].forEach((el, idx) => {
        const displayNumber = document.querySelector(`.exercise${idx}`).textContent;
        const displayEqual = document.querySelector(`.chooseText${idx}`).textContent;
        let solved = eval(displayNumber);
        if (solved !== +displayEqual) {
            allTasksCorrect = false; // Если хотя бы одна задача решена неправильно, устанавливаем флаг в false
        }
    });

    // После завершения цикла проверяем флаг и вызываем checkLevelCompletion с соответствующим значением
    checkLevelCompletion(allTasksCorrect);
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
