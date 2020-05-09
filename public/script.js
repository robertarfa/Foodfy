const cards = document.querySelectorAll('.card');
const addIngredient = document.querySelector('button.add-ingredient')
const addStep = document.querySelector('button.add-step')

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

    console.log(a)
}

if (addIngredient)
    addIngredient.addEventListener('click', () => {
        const lastIngredient = document.querySelector('input[name="ingredients[]"]:last-child').cloneNode(true)
        if (lastIngredient.value == '') {
            alert('Preencha o último ingrediente!')
            return
        }
        lastIngredient.value = ''
        document.querySelector('.ingredients').appendChild(lastIngredient)
    })

if (addStep)
    addStep.addEventListener('click', () => {
        const lastStep = document.querySelector('input[name="preparation[]"]:last-child').cloneNode(true)
        if (lastStep.value == '') {
            alert('Preencha o último passo!')
            return
        }
        lastStep.value = ''
        document.querySelector('.preparation').appendChild(lastStep)
    })