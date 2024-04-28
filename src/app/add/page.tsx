'use client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { createTodo } from '@/app/_actions/actions'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs"
import { Dayjs } from 'dayjs'

const AddPost = () => {
  const [dateTime, setDateTime] = useState<Dayjs|null>(null)
  const [title, setTitle] = useState("")

  const handleSubmit = () => {
    createTodo(title, dateTime?.toString() || new Date().toString());
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
        <form className='p-4 flex flex-col items-center gap-4'>
            <input type="text" name='title' id='title' value={title} onChange={(e:BaseSyntheticEvent)=>{
              // console.log(e.target.value)
              setTitle(e.target.value)
            }} placeholder='Title' className='border border-gray-200 text-gray-900 block p-2 rounded-lg'/>
            <DateTimePicker 
              label="Pick Deadline" 
              name='deadline'
              value={dateTime}
              onChange={(newValue) => {
                setDateTime(newValue)
                console.log(newValue?.toString())
              }}
            />
            <button type='button' onClick={handleSubmit} className='text-white bg-teal-600 rounded p-4'>Add</button>
        </form>
    </div>
    </LocalizationProvider>
  )
}

export default AddPost