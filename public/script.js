const cards = document.querySelectorAll('.card');

for (const card of cards) {

    if (!card.classList.contains('admin')) {
        card.addEventListener('click', () => {
            const index = card.getAttribute('id')
            window.location.href = `/recipes/${index}`
        })
    }
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

    // console.log(a)
}

//ADD INGREDIENTE / PREPARO
function addIngrediente() {
    const ingredientes = document.querySelector(".ingredients")
    const fieldContainer = document.querySelectorAll(".ing")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredientes.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", addIngrediente)

function addPreparo() {
    const ingredientes = document.querySelector(".passo-preparo")
    const fieldContainer = document.querySelectorAll(".prep")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredientes.appendChild(newField);

}

document.querySelector(".add-step").addEventListener("click", addPreparo)
