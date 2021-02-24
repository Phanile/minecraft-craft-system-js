document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName('item')
    const cells = document.getElementsByClassName('cell')
    const items = document.getElementsByClassName('items')[0]

    let currentCard = null
    let filler = document.createElement('div');
    filler.classList.add('item')

    const dragStart = function()
    {
        setTimeout(() => {
            this.classList.add('hide')
            currentCard = this
        })
    }

    const dragEnd = function()
    {
        this.classList.remove('hide')
    }

    const dragOver = function(event)
    {
        event.preventDefault()
    }

    const dragDrop = function()
    {
        this.append(currentCard)
        items.appendChild(filler)
    }

    for (var card of cards)
    {
        card.addEventListener('dragstart', dragStart)
        card.addEventListener('dragend', dragEnd)
        
    }

    for (var cell of cells)
    {
        cell.addEventListener('dragover', dragOver)
        cell.addEventListener('drop', dragDrop)
    }
})

