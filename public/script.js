var modalOnOff = document.querySelector(".modal-default");
var modalBody = document.querySelector(".modal-body");
var cards = document.querySelectorAll(".card");

for (let card of cards){
    card.addEventListener("click", function(){
        modalOnOff.classList.add('visible');
        const cardId = card.getAttribute('id');
        modalBody.querySelector('img').src = `assets/${cardId}`;
       
        const cardTitle = card.querySelector(".card-body p").textContent;
        const cardDetail = card.querySelector(".small").textContent;      
        modalBody.querySelector('.modal-title').innerHTML = cardTitle;
        modalBody.querySelector('.modal-detail').innerHTML = cardDetail;
        
    })
}

document.querySelector(".close").addEventListener("click", function(){
    modalOnOff.classList.remove('visible')
});

// var cardBodyId = document.querySelector(".card-body")

// for(let text of cardBodyId){
//     text.addEventListener("click", function(){
//     const bodyId = cardBodyid.getAttribute('id');
//     modalBody.querySelector('p').textContent = bodyId
    
//     })
// }


