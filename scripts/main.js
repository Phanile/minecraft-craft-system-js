document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName('item')
    const cells = document.getElementsByClassName('cell')
    const craftCells = document.getElementsByClassName('craft')
    const resultCell = document.getElementsByClassName('resultCraft')[0]

    let currentCard = null
    
    const changeCellProperty = (cell) => {
        if (cell.classList.contains('empty')) {
            cell.classList.remove('empty')
            cell.classList.add('full')
            return
        }
        if (cell.classList.contains('full')) {
            cell.classList.remove('full')
            cell.classList.add('empty')
        }
    }

    const canDropItemOnCell = (cell) => {
        if (cell.classList.contains('empty') && !cell.classList.contains('resultCraft')) return true
        else return false
    }

    const changeItemIdOnCell = (cell, item) => {
        cell.dataset.itemid = item.dataset.itemid
    }

    const clearCellItemId = (cell) => {
        cell.dataset.itemid = 0
    }

    const findCraft = () => {
        for (item of items) {
            if (item.isCraftable) {
                if (item.isHomogeneousCraftable) {
                    let x = item.craftItemsConfig[0]
                    let itemId = x.id
                    if (x.pos.length == 1) {
                        if (compareArrayWithWorkbench(x.pos[0], itemId, item, x.pos[0].length) != null) {
                            console.log('FIND', item.name, item.id)
                            createResultCraftItem(item.id)
                        }
                    }
                    else {
                        for (i of x.pos) {
                            console.log(i)
                        }
                    }
                }
            }
        }
    }

    const compareArrayWithWorkbench = (array, itemId, craftItem, countOfItems) => {
        let compareCount = 0
        for (cell of craftCells) {
            if (!canDropItemOnCell(cell) && cell.classList.contains('craft')) {
                if (cell.dataset.itemid == itemId) {
                    for (let i = 0; i < array.length; i++) {
                        if (cell.dataset.id == array[i]) {
                            compareCount += 1
                        }
                    }
                }
            }
        }
        if (compareCount == array.length && compareCount == countOfItems) {
            return craftItem
        }
        return null
    }

    const createResultCraftItem = (id) => {
        item = createItem(id)
        AddListenersToCard(item)
        resultCell.append(item)
        changeCellProperty(resultCell)
    }

    const clearWorkbench = () => {
        for (cell of craftCells) {
            cell.innerHTML = ``
            if (cell.classList.contains('full')) {
                cell.classList.remove('full')
                cell.classList.add('empty')
            }
        }
        resultCell.classList.remove('full')
        resultCell.classList.add('empty')
    }

    const dragDrop = function() {
        if (!canDropItemOnCell(this)) return

        let lastCell = currentCard.parentNode
        if (lastCell.classList.contains('resultCraft')) {
            clearWorkbench()
        }  
        changeCellProperty(lastCell)
        changeCellProperty(this)
        clearCellItemId(lastCell)
        this.append(currentCard)
        changeItemIdOnCell(this, currentCard)
        findCraft()
    }

    const dragStart = function() {
        setTimeout(() => {
            this.classList.add('hide')
            currentCard = this
            console.log(currentCard)
        })
    }

    const dragEnd = function() {
        this.classList.remove('hide')
    }

    const dragOver = function(event) {
        event.preventDefault()
    }

    const AddListenersToCard = (card) => {
        card.addEventListener('dragstart', dragStart)
        card.addEventListener('dragend', dragEnd)
    }

    for (var card of cards) {
        AddListenersToCard(card)
    }

    for (var cell of cells) {
        cell.addEventListener('dragover', dragOver)
        cell.addEventListener('drop', dragDrop)
    }
})

