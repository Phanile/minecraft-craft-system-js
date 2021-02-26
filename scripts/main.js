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
                    for (arr of item.craftItemsConfig[0].pos) {
                        console.log(arr)
                        if (compareArrayWithWorkbench(arr, item, item.isHomogeneousCraftable) != null) {
                            createResultCraftItem(item.id)
                        } 
                    }   
                }   
                else {
                    let multiArray = []
                    for (arr of item.craftItemsConfig) {
                        for (a of arr.pos) {
                            multiArray.push(a)
                        }
                    }
                    if (compareArrayWithWorkbench(multiArray, item, item.isHomogeneousCraftable) != null) {
                        createResultCraftItem(item.id)
                    }
                } 
            }
        }
    }

    const formDiffrentArray = () => {
        let ids = []
        let workbenchArray = []
        for (cell of craftCells) {
            if (cell.classList.contains('full')) {
                if (!ids.includes(parseInt(cell.dataset.itemid))) {
                    ids.push(parseInt(cell.dataset.itemid))
                }
            }
        }
        for (id of ids) {
            let array = []
            for (cell of craftCells) {
                if (parseInt(cell.dataset.itemid) == id) {
                    array.push(parseInt(cell.dataset.id))
                }
            }
            workbenchArray.push(array)
        }
        return workbenchArray
    }

    const formHomogeneousArray = () => {
        let workbenchArray = []
        for (cell of craftCells) {
            if (cell.classList.contains('full')) {
                workbenchArray.push(parseInt(cell.dataset.id))
            }
        }
        return workbenchArray 
    }

    const compareArrayWithWorkbench = (array, craftItem, isHomogeneousItem) => {
        if (isHomogeneousItem) {
            array.sort()
            if (formHomogeneousArray().join() == array.join()) {
                return craftItem
            }
        }
        else {
            array.sort()
            if (JSON.stringify(array) === JSON.stringify(formDiffrentArray())) {
                return craftItem
            }
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
            clearCellItemId(cell)
        }
        resultCell.classList.remove('full')
        resultCell.classList.add('empty')
        clearCellItemId(resultCell)
    }

    const clearResultCell = () => {
        resultCell.innerHTML = ``
        if (resultCell.classList.contains('full')) {
            resultCell.classList.remove('full')
            resultCell.classList.add('empty')
        }
    }

    const dragDrop = function() {
        if (!canDropItemOnCell(this)) return

        let lastCell = currentCard.parentNode
        if (lastCell.classList.contains('resultCraft')) {
            clearWorkbench()
        }
        clearResultCell()
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

