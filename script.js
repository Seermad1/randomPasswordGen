const password = document.getElementById('password')
const copy = document.getElementById('copy')
const range = document.getElementById('range')
const generate = document.getElementById('btn')
const number = document.getElementById('number-check')
const upperCase = document.getElementById('uppercase-check')
const lowerCase = document.getElementById('lower-check')
const symbol = document.getElementById('symbol-check')
const count = document.getElementById('count')

range.oninput = () =>{
    count.innerHTML = range.value
    const length = range.value
    const hasNumber = number.checked
    const hasUpper = upperCase.checked
    const hasLower = lowerCase.checked
    const hasSymbol = symbol.checked
    
    password.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
}

const randomFunc = {
    lower: getLowerCase, 
    upper: getUpperCase,
    symbol: getSymbol,
    number: getNumber
}

copy.addEventListener('click', ()=>{
    
    const textarea = document.createElement('textarea')
    const generatedPassword = password.innerText
    if(!generatedPassword){return ''}

    textarea.value = generatedPassword
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied successfully')
})

generate.addEventListener('click', ()=>{
    const length = range.value
    const hasNumber = number.checked
    const hasUpper = upperCase.checked
    const hasLower = lowerCase.checked
    const hasSymbol = symbol.checked
    
    password.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = ''
    let selection = number + upper + lower + symbol

    if (selection === 0){
        return ''
    }

    let selectionArr = [{lower}, {upper}, {number}, {symbol}].filter((obj) => Object.values(obj)[0])
    for (let i=0; i<length; i += selection){
        selectionArr.forEach( obj=>{
            const nameOfFunc = Object.keys(obj)[0]
            generatedPassword += randomFunc[nameOfFunc]()
        })
    }

    
    const finalPassword = generatedPassword.slice(0, length) 
    return finalPassword
    
}

function getLowerCase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getUpperCase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getNumber(){
    return Math.floor(Math.random() * 10)
}
function getSymbol(){
   const symbols = '!@#$%^&*(){}[]=<>/,.'
   return symbols[Math.floor(Math.random() * symbols.length)]
}