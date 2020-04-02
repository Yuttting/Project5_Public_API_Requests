// Search markup: 
// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>
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
const noResult = document.createElement('p');
noResult.textContent = "No result";
noResult.style.display = "none";
noResult.id = "no-result";
galleryDiv.appendChild(noResult);
const body = document.getElementsByTagName('body')[0];
const names = document.getElementsByClassName('card-name');


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
            <p class="card-text cap">${data.results[i].location.city}</p>
            <p class = "hide">${data.results[i].phone}</p>
            <p class = "hide">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.state} ${data.results[i].location.postcode}</p>
            <p class = "hide">Birthday: ${bmonth}/${bday}/${byear}</p>
            `;
        cardDiv.appendChild(cardInfo);

        
        // when click a card, shows a modal window
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

        const modalContainer = document.createElement('div');
        modalContainer.className = "modal-container";
        const modal = document.createElement('div');
        modal.className = "modal";
        const button = document.createElement('button');
        button.type = "button";
        button.id = "modal-close-btn";
        button.className = "modal-close-btn";
        button.innerHTML = "<strong>X</strong>";
        const modalInfo = document.createElement('div');
        modalInfo.className = "modal-info-container";

        //generate Prev and Next buttons
        const modalBtn = document.createElement('div');
        modalBtn.className = "modal-btn-container";
        buttonPrev = document.createElement('button');
        buttonPrev.type = "button";
        buttonPrev.id = "modal-prev";
        buttonPrev.className = "modal-prev btn";
        buttonPrev.textContent = "Prev";
        buttonNext = document.createElement('button');
        buttonNext.type = "button";
        buttonNext.id = "modal-next";
        buttonNext.className = "modal-next btn";
        buttonNext.textContent = "Next";
        button.onclick = function(){modalContainer.style.display = "none"};

        cardDiv.addEventListener('click', (e)=>{
            modalContainer.style.display = "block";
            body.appendChild(modalContainer);
            modalContainer.appendChild(modal);
            button.onclick = function(){modalContainer.style.display = "none"};
            modal.appendChild(button);
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

            modalContainer.appendChild(modalBtn);
            modalBtn.appendChild(buttonPrev);
            modalBtn.appendChild(buttonNext);
            

            //Click the Prev button to show the modal window of the preivous card
            buttonPrev.onclick = function(e){
                for(let j = 1; j < names.length; j++){
                    if(names[j].textContent === e.target.parentNode.previousSibling.children[1].children[1].textContent){
                        body.appendChild(modalContainer);
                        modalContainer.appendChild(modal);
                        modal.appendChild(button);
                        modalInfo.innerHTML = `
                            <img class="modal-img" src=${document.getElementsByClassName('card-img')[j-1].src} alt="profile picture">
                            <h3 id="name" class="modal-name cap">${names[j-1].textContent}</h3>
                            <p class="modal-text">${names[j-1].nextElementSibling.textContent}</p>
                            <p class="modal-text cap">${names[j-1].nextElementSibling.nextElementSibling.textContent}</p>
                            <hr>
                            <p class="modal-text">${names[j-1].nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                            <p class="modal-text">${names[j-1].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                            <p class="modal-text">${names[j-1].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                        `;
                        modal.appendChild(modalInfo);
                        modalContainer.appendChild(modalBtn);
                        modalBtn.appendChild(buttonPrev);
                        modalBtn.appendChild(buttonNext);
                    }
                }
            };

            buttonNext.onclick = function(e){
                for(let j = names.length -2; j > -1; j--){
                    if(names[j].textContent === e.target.parentNode.previousSibling.children[1].children[1].textContent){
                        body.appendChild(modalContainer);
                        modalContainer.appendChild(modal);
                        modal.appendChild(button);
                        modalInfo.innerHTML = `
                            <img class="modal-img" src=${document.getElementsByClassName('card-img')[j+1].src} alt="profile picture">
                            <h3 id="name" class="modal-name cap">${names[j+1].textContent}</h3>
                            <p class="modal-text">${names[j+1].nextElementSibling.textContent}</p>
                            <p class="modal-text cap">${names[j+1].nextElementSibling.nextElementSibling.textContent}</p>
                            <hr>
                            <p class="modal-text">${names[j+1].nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                            <p class="modal-text">${names[j+1].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                            <p class="modal-text">${names[j+1].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}</p>
                        `;
                        modal.appendChild(modalInfo);
                        modalContainer.appendChild(modalBtn);
                        modalBtn.appendChild(buttonPrev);
                        modalBtn.appendChild(buttonNext);
                    }
                }
            };
            //the first card only shows the Next button and the last card only shows the Prev button
            // if(`${e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.textContent}` === names[0].textContent){
            //     modalBtn.removeChild(buttonPrev);
            // } else if(`${e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.textContent}` === names[11].textContent){
            //     modalBtn.removeChild(buttonNext);
            // }
        })
    }

}


//add search functionality, showing search results when typing or click the search button
let getSearchResult = function() {
    noResult.style.display = "none";
    for(let i = 0; i<names.length; i++){
        if(names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase()) && searchInput.value != null){
            names[i].parentNode.parentNode.style.display = "flex";
        } else {
            names[i].parentNode.parentNode.style.display = "none";
        }
    }
    const cards = document.getElementsByClassName('card');
    let num = 0;
    for(let i = 0; i< cards.length; i++){
        if(cards[i].style.display === 'flex'){
            num += 1;
        }
    }
    if(num === 0){
        noResult.style.display = "flex";
    }
}
searchInput.addEventListener('keyup', getSearchResult);
submit.addEventListener('click', getSearchResult);
         

