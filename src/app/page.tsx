"use client"

import { useState } from 'react'
import { Display } from '@/components/Display'
import { Button } from '@/components/Button';

type OperationProps = {
  displayValue: string
  clearDisplay: boolean
  operation: '/' | '*' | '+' | '-' | '=' | null
  values: number[]
  current: number
}

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default function Home() {
  const [calculator, onCalculator] = useState<OperationProps>(initialState)

  function addDigit(digit: string) {
    const clearDisplay = calculator.displayValue === '0' || calculator.clearDisplay

    if ((digit === '.' && !clearDisplay) && calculator.displayValue.includes('.')) return;

    const currentValue = clearDisplay ? '' : calculator.displayValue
    const displayValue = currentValue + digit

    if (digit !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...calculator.values]

      values[calculator.current] = newValue

      onCalculator((fields) => ({
        ...fields,
        displayValue,
        clearDisplay: false,
        values,
      }))
    }
  }

  function clearOperation() {
    onCalculator({ ...initialState });
  }

  function setOperation(operation: '/' | '*' | '+' | '-' | '=') {
    if (calculator.current === 0) {
      onCalculator((fields) => ({
        ...fields,
        operation,
        current: 1,
        clearDisplay: true,
      }))
    } else {
      const equals = operation === '='
      const values = [...calculator.values]

      try {
        values[0] = 
          eval(`${values[0]} ${calculator.operation} ${values[1]}`)
      } catch (e) {
        values[0] = calculator.values[0]
      }
  
      values[1] = 0

      onCalculator((fields) => ({
        ...fields,
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values,
      }))
    }
  }

  return (
    <main className="flex bg-slate-600 min-h-screen flex-col items-center justify-center p-24">
       <div className="flex flex-col gap-4 max-w-xl w-full p-2 bg-slate-100 rounded-lg">
         <Display label={calculator.displayValue} />
         <div className="grid grid-cols-4 gap-4 w-full px-4 py-2">
          <Button label='AC' className='col-span-3' role="triple" onClick={clearOperation} />
          <Button label='/' role="operation" onClick={() => setOperation('/')} />
          <Button label='7' onClick={() => addDigit('7')} />
          <Button label='8' onClick={() => addDigit('8')} />
          <Button label='9' onClick={() => addDigit('9')} />
          <Button label='*' role="operation" onClick={() => setOperation('*')}  />
          <Button label='4' onClick={() => addDigit('4')} />
          <Button label='5' onClick={() => addDigit('5')} />
          <Button label='6' onClick={() => addDigit('6')} />
          <Button label='-' role="operation" onClick={() => setOperation('-')} />
          <Button label='1' onClick={() => addDigit('1')} />
          <Button label='2' onClick={() => addDigit('2')} />
          <Button label='3' onClick={() => addDigit('3')} />
          <Button label='+' role="operation" onClick={() => setOperation('+')} />
          <Button label='0' className='col-span-2' role="double" onClick={() => addDigit('0')}  />
          <Button label='.' onClick={() => addDigit('.')} />
          <Button label='=' role="operation" onClick={() => setOperation('=')} />
         </div>
       </div>
    </main>
  )
}
