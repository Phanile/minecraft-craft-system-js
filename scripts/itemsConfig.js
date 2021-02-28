const startItemsIds = [3, 4]
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
        'craftItemsConfig' : [
            {
                'id' : 1,
                'pos' : [5, 8]
            },
            {
                'id' : 2,
                'pos' : [1, 2, 3]
            }
        ]
    },
    {
        'id' : 4,
        'name' : 'diamond boots',
        'url' : 'images/diamondBoots.png',
        'isCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 2,
                'pos' : [1, 3, 4, 6]
            }
        ]
    },
    {
        'id' : 5,
        'name' : 'diamond helmet',
        'url' : 'images/diamondHelmet.png',
        'isCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 2,
                'pos' : [1, 2, 3, 4, 6]
            }
        ]
    },
    {
        'id' : 6,
        'name' : 'diamond sword',
        'url' : 'images/diamondSword.png',
        'isCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 1,
                'pos' : [8]
            },
            {
                'id' : 2,
                'pos' : [2, 5]
            }
        ]
    },
    {
        'id' : 7,
        'name' : 'sticks for food',
        'url' : 'images/sticks.png',
        'isCraftable' : true,
        'craftItemsConfig' : [
            {
                'id' : 1,
                'pos' : [2, 4]
            }
        ]
    }
]