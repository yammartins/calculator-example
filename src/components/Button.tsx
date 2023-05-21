"use client"

import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  label: string;
  role?: 'double' | 'triple' | 'operation'
}

export function Button({ label, role, className, ...props }: ButtonProps) {
  const styled = classNames(
    role === 'operation' && 'text-white bg-orange-600',
    role !== 'operation' && 'text-white bg-slate-600 border-slate-900',
    !role && 'bg-slate-100 text-black border-slate-600',
    'flex py-5 rounded-md text-4xl text-center justify-center font-medium border transition-colors hover:opacity-70',
    className
  ) 
    
  return (
    <button {...props} className={styled}>
      {label}
    </button>
  )
}