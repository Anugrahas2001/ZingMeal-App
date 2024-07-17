import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown,faLocationDot,faMagnifyingGlass,faAngleDown,faHouse,faShoppingCart,faUserTie} from '@fortawesome/free-solid-svg-icons'
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
        <div className="w-36">
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
              <input className='serach-input none cur-point' type="text" placeholder='Search for restaurant, cuisine or a dish' ref={inputRef} value={dishname} onChange={e=>{setDishName(e.target.value)}}/>
            </div>

        <div className="">
            {/* <FontAwesomeIcon className='margin-left' icon={faShoppingCart} /> */}
            <p>Anugraha</p>
          </div>
    </div>
  );
}

export default Header
