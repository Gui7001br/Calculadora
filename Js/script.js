const previewsOperationText = document.querySelector('#previews-operations')
const currentOperationText = document.querySelector('#current-operations')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
    constructor(previewsOperationText, currentOperationText) {
        this.previewsOperationText = previewsOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    // addDigit to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return;
        }

        // console.log(digit);
        this.currentOperation = digit
        this.updateScreen()
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is emprty
        if(this.currentOperationText.innerText === '' && operation !== 'C') {
            // Change operation
            if(this.previewsOperationText.innerText !== '') {
              this.changeOperation(operation); 
            }
            return;
        }


        // Get current and previews value
        let operationValue;
        const previews = +this.previewsOperationText.innerText.split(' ')[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case '+':
                operationValue = previews + current
                this.updateScreen(operationValue, operation, current, previews)
                break;
            case '-':
                operationValue = previews - current
                this.updateScreen(operationValue, operation, current, previews)
                break;
            case '/':
                operationValue = previews / current
                this.updateScreen(operationValue, operation, current, previews)
                break;
            case '*':
                operationValue = previews * current
                this.updateScreen(operationValue, operation, current, previews)
                break;
            case 'DEL':
                this.processDelOperator()
                break;
            case 'CE':
                this.processClearCurrentOperator()
                break;
            case 'C':
                this.processClearOperator()
                break;
            case '=':
                this.processEqualsOperator()
                break;

            default:
                return
        }
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previews = null
        ) {
            // console.log(operationValue, operation, previews, current);
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //  Check if value is zero, if it is just add current value
            if(previews === 0) {
                operationValue = current
            } 

            // Add current value to previews
            this.previewsOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Change math operation
    changeOperation(operation) {
        const mathOperation = ['*', '/', '+', '-']

        if(!mathOperation.includes(operation)) {
            return
        }

        this.previewsOperationText.innerText = this.previewsOperationText.innerText.slice(0, -1) + operation
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // clear current operations
    processClearCurrentOperator() {
        this.currentOperationText.innerText = '';
    }

    // Clear all operation
    processClearOperator() {
        this.currentOperationText.innerText = '';
        this.previewsOperationText.innerText = '';
    }

    // Process an operation
    processEqualsOperator() {
        const operation = previewsOperationText.innerText.split(' ')[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previewsOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;
        // console.log(value);
        if (+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})