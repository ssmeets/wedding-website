import { Input } from '@headlessui/react'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

export default function RsvpInput(
  { setFunction, value, ...restProps }
    :
    { setFunction: (value: string) => void, value: string }) {


  return (
    <Input className={clsx(
      'mt-3 block w-full rounded-lg border-2 bg-white/5 py-1.5 px-3 text-sm/6 text-black',
      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
    )} type="text" onChange={(e) => (setFunction(e.target.value))} value={value} {...restProps} />
  )
}
