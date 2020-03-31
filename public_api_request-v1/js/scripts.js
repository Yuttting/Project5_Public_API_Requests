// Search markup: 
// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>
//How to Insert Unicode character into JavaScript:
//https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
//https://www.fileformat.info/info/unicode/char/1f50d/index.htm         
const searchDiv = document.getElementsByClassName('search-container')[0];
const form = document.createElement('form');
form.action = '#';
form.method = "get";
searchDiv.appendChild(form);
const searchInput = document.createElement('input');
searchInput.id = "search-input"
searchInput.type = "search";
searchInput.className = "search-input";
searchInput.placeholder = "Search...";
form.appendChild(searchInput);
const submit = document.createElement('input');
submit.id = "search-submit"
submit.type = "submit";
submit.className = "search-submit";
submit.setAttribute('value', "\uD83D\uDD0D");   
form.appendChild(submit);

//get 12 employees
//https://randomuser.me/documentation
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      generateHTML(data);
    }
  });

// Generate the markup for each profile
/* 
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div> 
*/
const galleryDiv = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
function generateHTML(data){
    for(let i=0; i<data.results.length; i++){
        const cardDiv = document.createElement('div');
        cardDiv.className = "card";
        galleryDiv.appendChild(cardDiv);
        const cardImg = document.createElement('div');
        cardImg.className = "card-img-container";
        cardImg.innerHTML = `<img class='card-img' src=${data.results[i].picture.large} alt='profile picture'>`;
        cardDiv.appendChild(cardImg);

        const cardInfo = document.createElement('div');
        cardInfo.className = "card-info-container";
        let byear = `${data.results[i].dob.date}`.slice(0,4);
        let bmonth = `${data.results[i].dob.date}`.slice(5,7);
        let bday = `${data.results[i].dob.date}`.slice(8,10);
        cardInfo.innerHTML = `
            <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
            <p class="card-text">${data.results[i].email}</p>
            <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
            <p class = "hide">${data.results[i].phone}</p>
            <p class = "hide">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.city}, ${data.results[i].location.state} ${data.results[i].location.postcode}</p>
            <p class = "hide">Birthday: ${bmonth}/${bday}/${byear}</p>
            `;
    
        cardDiv.appendChild(cardInfo);


        // <div class="modal-container">
        //     <div class="modal">
        //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        //         <div class="modal-info-container">
        //             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        //             <h3 id="name" class="modal-name cap">name</h3>
        //             <p class="modal-text">email</p>
        //             <p class="modal-text cap">city</p>
        //             <hr>
        //             <p class="modal-text">(555) 555-5555</p>
        //             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        //             <p class="modal-text">Birthday: 10/21/2015</p>
        //         </div>
        //     </div>

        //     // IMPORTANT: Below is only for exceeds tasks 
        //     <div class="modal-btn-container">
        //         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        //         <button type="button" id="modal-next" class="modal-next btn">Next</button>
        //     </div>
        // </div>

        cardDiv.addEventListener('click', (e)=>{
            console.log(e.target);
            console.log(e.currentTarget);
            const modalContainer = document.createElement('div');
            modalContainer.className = "modal-container";
            body.appendChild(modalContainer);
            const modal = document.createElement('div');
            modal.className = "modal";
            modalContainer.appendChild(modal);
            const button = document.createElement('button');
            button.type = "button";
            button.id = "modal-close-btn";
            button.className = "modal-close-btn";
            button.innerHTML = "<strong>X</strong>";
            button.onclick = function(){modalContainer.style.display = "none"}
            modal.appendChild(button);
            const modalInfo = document.createElement('div');
            modalInfo.className = "modal-info-container";
            modalInfo.innerHTML = `
                <img class="modal-img" src=${e.currentTarget.firstElementChild.firstElementChild.src} alt="profile picture">
                <h3 id="name" class="modal-name cap">${e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.textContent}</h3>
                <p class="modal-text">${e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent}</p>
                <p class="modal-text cap">${e.currentTarget.children[1].children[2].textContent}</p>
                <hr>
                <p class="modal-text">${e.currentTarget.children[1].children[3].textContent}</p>
                <p class="modal-text">${e.currentTarget.children[1].children[4].textContent}</p>
                <p class="modal-text">${e.currentTarget.children[1].children[5].textContent}</p>
            `;
            modal.appendChild(modalInfo);
        })
    }

}


//add search functionality 
const searchSubmit = document.getElementById('search-submit');
const searchbar = document.getElementById('search-input');
const names = document.getElementsByClassName('card-name');
searchSubmit.addEventListener('click', (e)=>{
    for(let i = 0; i<names.length; i++){
        
    }
})    

