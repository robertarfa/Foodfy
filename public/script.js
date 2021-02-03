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

document.querySelector(".add-ingredient") && document.querySelector(".add-ingredient").addEventListener("click", addIngrediente)

function addPreparo() {
    const ingredientes = document.querySelector(".passo-preparo")
    const fieldContainer = document.querySelectorAll(".prep")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredientes.appendChild(newField);

}

document.querySelector(".add-step") && document.querySelector(".add-step").addEventListener("click", addPreparo)

//Paginação
function paginate(selectedPage, totalPages) {

    let pages = [], oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    // console.log(pages)
    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;

const pages = paginate(page, total)


let elements = ''

for (let page of pages) {

    if (String(page).includes("...")) {
        elements += `<span>${page}</span>`
    } else {
        elements += `<a href="?page=${page}">${page}</a>`

    }

}

pagination.innerHTML = elements