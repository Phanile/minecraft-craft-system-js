document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName('item')
    const cells = document.getElementsByClassName('cell')

    let currentCard = null

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
        currentCard = null
    }

    const dragOver = function(event)
    {
        event.preventDefault()
    }

    const dragDrop = function()
    {
        this.append(currentCard)
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

