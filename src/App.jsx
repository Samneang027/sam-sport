import React from 'react'
import Menu_phone from './components/menu_phone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function MyApp() {
  return (
    <div>
      <h1 className='bg-primary px-4 py-2 rounded'>Welcome to my app1</h1>
      <Menu_phone/>
    </div>
  );
}