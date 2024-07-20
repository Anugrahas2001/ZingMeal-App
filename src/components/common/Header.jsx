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
      <div className="flex items-center justify-between w-full h-[40px] bg-red-400">
        <div className="w-36">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="app-logo"
            className="w-36 object-cover"
          />
        </div>
        <div className="w-36 flex">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input className='serach-input none cur-point' type="text" placeholder='Search for restaurant, cuisine or a dish' ref={inputRef} value={dishname} onChange={e=>{setDishName(e.target.value)}}/>
            </div>

        <div className="flex mr-4 pr-4">
        <Link to='/'><FontAwesomeIcon className='margin-left' icon={faHouse} /></Link>
            <Link to='/cart'><FontAwesomeIcon className='margin-left' icon={faShoppingCart} /></Link>
          </div>
    </div>
  );
}

export default Header
