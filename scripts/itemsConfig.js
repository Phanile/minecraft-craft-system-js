const items = [
    {
        'id' : 1,
        'name' : 'stick',
        'url' : 'images/stick.png',
        'isCraftable' : false
    },
    {
        'id' : 2,
        'name' : 'diamond',
        'url' : 'images/diamond.png',
        'isCraftable' : false
    },
    {
        'id' : 3,
        'name' : 'diamond pick',
        'url' : 'images/pick.png',
        'isCraftable' : true,
        'isHomogeneousCraftable' : false,
        'craftItemsConfig' : [
            {
                'id' : 1,
                'pos' : [[5, 8]]
            },
            {
                'id' : 2,
                'pos' : [[1, 2, 3]]
            }
        ]
    },
    {
        'id' : 4,
        'name' : 'diamond boots',
        'url' : 'images/diamondBoots.png',
        'isCraftable' : true,
        'isHomogeneousCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 2,
                'pos' : [[1, 3, 4, 6]] //, [4, 6, 7, 9]
            }
        ]
    },
    {
        'id' : 5,
        'name' : 'diamond helmet',
        'url' : 'images/diamondHelmet.png',
        'isCraftable' : true,
        'isHomogeneousCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 2,
                'pos' : [[1, 2, 3, 4, 6]] //, [4, 6, 7, 9]
            }
        ]
    }
]

const createItem = (id) => {
    let item = items[id - 1]
    let div = document.createElement('div')
    div.className = 'item'
    div.setAttribute('data-ItemId', `${item.id}`)
    div.setAttribute('draggable', 'true')
    div.style.backgroundImage = `url('${item.url}')`
    return div
}