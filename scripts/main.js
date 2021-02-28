document.addEventListener("DOMContentLoaded", () => {
    const cells = document.getElementsByClassName('cell')
    const craftCells = document.getElementsByClassName('craft')
    const resultCell = document.getElementsByClassName('resultCraft')[0]
    const inventory = document.getElementsByClassName('items')[0]

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
        return false
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
                if (compareArrayWithWorkbench(item.craftItemsConfig, item) != null) {
                    createResultCraftItem(item.id)
                }
            }
        }
    }

    const compareArrayWithWorkbench = (array, craftItem) => {
        let itemObjectFromWorkbench = formItemArrayFromWorkbench()
        if (_.isEqual(array, itemObjectFromWorkbench)) {
            return craftItem
        }
        return null
    }

    const formItemArrayFromWorkbench = () => {
        let workbenchArray = []
        let ids = []

        for (cell of craftCells) {
            if (cell.classList.contains('full')) {
                if (!ids.includes(parseInt(cell.dataset.itemid))) {
                    ids.push(parseInt(cell.dataset.itemid))
                }
            }
        }

        for (i = 0; i < ids.length; i++) {
            let item = {
                id : parseInt(ids[i]),
                pos : []
            }
            for (cell of craftCells) {
                if (cell.classList.contains('full') && cell.dataset.itemid == ids[i]) {
                    item.pos.push(parseInt(cell.dataset.id))
                }
            }
            workbenchArray.push(item)
        }
        return workbenchArray.sort().reverse()
    }

    const createResultCraftItem = (id) => {
        item = createItem(id)
        AddListenersToItem(item)
        resultCell.append(item)
        changeCellProperty(resultCell)
    }

    const createItem = (id) => {
        let item = items[id - 1]
        let div = document.createElement('div')
        div.className = 'item'
        div.setAttribute('data-ItemId', `${item.id}`)
        div.setAttribute('draggable', 'true')
        div.style.backgroundImage = `url('${item.url}')`
        return div
    }

    const createCell = (isFull) => {
        let div = document.createElement('div')
        if (isFull) div.className = 'cell full inventory'
        else div.className = 'cell empty inventory'
        return div
    }

    const createStartItemsInInventory = () => {
        diff = 9 - startItemsIds.length
        for (itemId of startItemsIds) {
            cell = createCell(true)
            item = createItem(itemId)
            cell.append(item)
            cell.setAttribute('data-ItemId', `${itemId}`)
            AddListenersToItem(item)
            AddListenersToCell(cell)
            inventory.append(cell)
        }
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                cell = createCell(false)
                cell.setAttribute('data-ItemId', `0`)
                AddListenersToCell(cell)
                inventory.append(cell)
            }
        }
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

    const AddListenersToItem = (item) => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragEnd)
    }

    const AddListenersToCell = (cell) => {
        cell.addEventListener('dragover', dragOver)
        cell.addEventListener('drop', dragDrop)
    }

    for (var cell of cells) {
        AddListenersToCell(cell)
    }

    createStartItemsInInventory()
})

