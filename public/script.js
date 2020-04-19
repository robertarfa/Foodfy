const cards = document.querySelectorAll('.card');

for (let [index, card] of cards.entries()){

    card.addEventListener('click', function(){
       window.location.href = `/recipes/${index}`
              
    })
}

const details = document.querySelectorAll('.details')

for (const detail of details) {
    const a = detail.querySelector('.details a')

    a.addEventListener('click', function () {
        if (detail.querySelector('.content').classList.contains('hide')) {
            a.innerText = 'Esconder'
            detail.querySelector('.content').classList.remove('hide')
        } else {
            a.innerText = 'Mostrar'
            detail.querySelector('.content').classList.add('hide')
        }
    })

    console.log(a)
}