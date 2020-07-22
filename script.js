const body = document.body;

const urlParam = window.location.search.substring(1);
const login = (urlParam.split(('='))[1]);

let url = 'https://api.github.com/users/deminavalentina22';
  if(urlParam != '') {
    url = `https://api.github.com/users/${login}`
  }

let getDate = new Promise((resolve, reject) => {
let nowDate = new Date();
  setTimeout(() => nowDate ? resolve(nowDate) : reject ('Время не определено'), 3000)
  });

   let preloader = document.querySelector('.preloader');

   function preLouder() {
    preloader.classList.add('hidden');
   }
  
let getUser = fetch(url)

Promise.all([getUser, getDate])
  .then(([user, date]) => {
    userUrl = user;
    dateNow = date;
  })
  
  .then(response => {
    if (userUrl.status !== 404) {
      return userUrl.json();
    }
    else {
      let err = new Error(userUrl.statusText + ' ' + userUrl.status);
      err.userUrl = response;
      throw err   
    }
  })
  
  .then(json => {
   let div = document.createElement('div');
   div.className = 'content'
   document.body.append(div);

   let date = document.createElement('p');
    date.innerHTML = dateNow;
    div.append(date);

   let ava = new Image();  
   ava.src = json.avatar_url;
   div.append(ava);
   
   let name = document.createElement('p');
   name.classList.add('link');
   name.addEventListener("click", () => window.location = json.html_url);
    if (json.name != null) {
      name.innerHTML = json.name;    
    } else {
      name.innerHTML = 'Информация об имени пользователя недоступна';
    }
    div.append(name); 
    
   let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;    
    } else {
       bio.innerHTML = 'Пользователь не заполнил это поле';
    }
    div.append(bio);

     preLouder();  
    })

   .catch(error => document.body.innerHTML = `Пользователь не найден. <br> ${error}`);