import React, { useEffect, useState } from 'react';

function Theme() {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const savedTheme = localStorage.getItem('theme') || getSystemTheme();
  const [theme, setTheme] = useState(savedTheme);
  useEffect(() => {
    document.documentElement.getAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
  function handleToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  return (
    <li>
      <input
        type='checkbox'
        value='dark'
        checked={theme === 'dark'}
        onChange={handleToggle}
        className='toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]'
      />
    </li>
  );
}

export default Theme;
