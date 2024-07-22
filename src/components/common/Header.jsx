import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faHouse,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Header = () => {

  const inputRef=useRef(null);
  const[dishname,setDishName]=useState('');

  useEffect(()=>{
    inputRef.current.focus()
  })

  return (
      <div className="flex items-center justify-between w-full h-[60px] m-4 ">
        <div className="w-36">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="app-logo"
            className="w-36 object-cover"
          />
        </div>
        <div className="w-1/3 flexrounded-md text-gray-500 h-10  m-2 shadow rounded-md">
              <FontAwesomeIcon className='mt-3 ml-2' icon={faMagnifyingGlass} />
              <input className='w-96  text-gray-500 h-10 p-2 border-none outline-none' type="text" placeholder='Search for restaurant, cuisine or a dish' ref={inputRef} value={dishname} onChange={e=>{setDishName(e.target.value)}}/>
            </div>

        <div className="flex m-2 w-28">
        <div className='w-16 flex justify-between'>
        <Link to='/'><FontAwesomeIcon className='margin-left' icon={faHouse} /></Link>
            <Link to='/cart'>
            <div className='flex'>
            <FontAwesomeIcon className='margin-left w-9 mt-1' icon={faShoppingCart} />
            <div className='flex'>
            <p className='w-5 h-5 rounded-full bg-red-500 absolute right-12 top-5 mb-4 flex items-center pl-2'>0</p>
            </div>
            </div>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Header
