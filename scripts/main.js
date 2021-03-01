const cells = document.getElementsByClassName('cell')
const craftCells = document.getElementsByClassName('craft')
const inventoryCells = document.getElementsByClassName('inventory')
const resultCell = document.getElementsByClassName('resultCraft')[0]
const inventory = document.getElementsByClassName('items')[0]
var WBA = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let currentCard = null

function clear(){
    inventory.innerHTML = `
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
        <div class="cell empty inventory" data-itemId="0"></div>
    `
}

const changeCellProperty = (cell) => {
    if (cell.classList.contains('empty')) {
        cell.classList.remove('empty')
        cell.classList.add('full')
        return
    }
    else {
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

const updateWBA = () => {
    for (let [id, cell] of Array.from(craftCells).entries()){
        WBA[~~(id / 3)][id % 3] = +cell.dataset.itemid
    }
}

const formedCraft = () => {
    
    let currentRecipe = JSON.parse(JSON.stringify(WBA))
    let values = Object.values(formedRecipes)
    let keys = Object.keys(formedRecipes)

    for (let i = 0; i < currentRecipe.length; i++){
        f = false
        for (let j = 0; j < currentRecipe[i].length; j++){
            if (currentRecipe[i][j] != 0){
                f = true
            }
        }
        if (!f){
            currentRecipe.splice(i, 1)
        }
    }

    for (let i = 0; i < currentRecipe[0].length; i++){
        f = false
        for (let j = 0; j < currentRecipe.length; j++){
            if (currentRecipe[j][i] != 0){
                f = true
            }
        }
        if (!f){
            for (let j = 0; j < currentRecipe.length; j++){
                if (!((i == 1) && (currentRecipe[j].length == 3))){                       
                    currentRecipe[j].splice(i, 1)
                }
            }
        }
    }

    for ([index, recipe] of values.entries()){
        if(_.isEqual(currentRecipe, recipe)){
            return(keys[index])
        }
    }
    return(0)
}

const unformedCraft = () => {
    let currentItems = {}
    let values = Object.values(unformedRecipes)
    let keys = Object.keys(unformedRecipes)

    for (i of WBA){
        for (j of i){
            if (j != 0){
                currentItems[j] = 0
            }
        }
    }
    for (key in currentItems){
        for (i of WBA){
            currentItems[key] += i.filter(function(x){return x==key}).length
        }
    }

    
    for ([index, recipe] of values.entries()){
        if(_.isEqual(currentItems, recipe)){
            return(keys[index])
        }
    }
    return(0)
}

const createResultCraftItem = (id) => {
    if (id > 0){
        item = createItem(id)
        AddListenersToItem(item)
        resultCell.append(item)
        changeCellProperty(resultCell)
    }
}

const createItem = (id) => {
    let item = items[+id - 1]
    let div = document.createElement('div')
    div.className = 'item'
    div.setAttribute('data-itemId', `${item.id}`)
    div.setAttribute('draggable', 'true')
    div.style.backgroundImage = `url('${item.url}')`
    AddListenersToItem(div)
    return div
}

const createStartItems = () => {
    for ([i, id] of startItemsIds.entries()){
        cell = inventoryCells[i]
        cell.classList.remove('empty')
        cell.classList.add('full')
        AddListenersToCell(cell)
        cell.append(createItem(id))
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
    updateWBA()
    createResultCraftItem(formedCraft())
    createResultCraftItem(unformedCraft())
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

createStartItems()

