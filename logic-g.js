let numberAndBooleanNumiration = [1,2,3]

function booleanValue(index){
    const displayText = document.querySelector(`.chooseText${index}`);
    
    if (displayText.textContent === "?") {
        displayText.textContent = "true";
    } else if (displayText.textContent === "false") {
        displayText.textContent = "?";
    } else {
        displayText.textContent = "false";
    }
    console.log(displayText.textContent)
}

function solveEx(){

    numberAndBooleanNumiration.map((idx) => {
        const displayNumber = document.querySelector(`.exercise${idx}`).textContent
        console.log(displayNumber)
        let solved = eval(displayNumber)
        if(solved){
            console.log(solved)
        } else(
            console.log(solved)
        )
        // const displayNumber = document.querySelectorAll(`.number${idx}`);
        // const displayBoolean = document.querySelectorAll(`.boolean${idx}`);
        // if(displayNumber.textContent === 1){
        //     exeArray.pust(true)
        // }
    })
}
solveEx()
// const displayNumber = document.querySelector(`.number${1}`);

function factorial(n) {
    if (n <= 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  
// Генерируем случайные значения для операндов (0 или 1)
function generateRandomExpression() {
    const operands = ['0', '1'];
    const operators = ['+', '*'];
    
    function generateOperand() {
      return operands[Math.floor(Math.random() * operands.length)];
    }
    
    function generateOperator() {
      return operators[Math.floor(Math.random() * operators.length)];
    }
  
    // Генерируем случайное выражение
    const expression = [];
    expression.push(generateOperand());
  
    for (let i = 0; i < 3; i++) { // Максимальная длина выражения = 3 (можно изменить)
      expression.push(generateOperator());
      expression.push(generateOperand());
    }
  
    const randomExpression = expression.join('');
    return randomExpression
  }
  
  // Генерируем и выводим случайное логическое выражение
  const randomExpression = generateRandomExpression();
  console.log(randomExpression);
  
  

function checkValue (){

}
