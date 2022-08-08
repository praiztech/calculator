export {setDefaultTheme, changeTheme};

const rootElem = document.documentElement;

function setDefaultTheme() {
  let theme = localStorage.getItem('theme');
  if (theme === null) {
    //check if dark mode is activated as OS/platform preference
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.getElementById(theme).click();
  rootElem.setAttribute('data-theme', theme);
}

function changeTheme() {
  let theme = document.querySelector('input[name="theme"]:checked').value;
  rootElem.setAttribute('data-theme', theme); 
  
  //save user theme choice
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}
