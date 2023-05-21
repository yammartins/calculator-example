"use client"

import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  label: string;
  role: 'double' | 'triple' | 'operation'
}

export function Button({ label, role, ...props }: ButtonProps) {
  const styled = classNames(
    role === 'operation' && 'text-white bg-orange-600',
    role !== 'operation' && 'text-black bg-slate-100 border-slate-600',
    'flex py-5 rounded-md text-4xl text-center font-medium border'
  ) 
    
  return (
    <button {...props} className={styled}>
      {label}
    </button>
  )
}