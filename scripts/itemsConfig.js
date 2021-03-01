const startItemsIds = [];
const items = [
    {
        'id' : 1,
        'name' : 'Stick',
        'url' : 'images/stick.png',
        'isCraftable' : false
    },
    {
        'id' : 2,
        'name' : 'Diamond',
        'url' : 'images/diamond.png',
        'isCraftable' : false
    },
    {
        'id' : 3,
        'name' : 'Diamond pickaxe',
        'url' : 'images/pick.png',
        'isCraftable' : true
    },
    {
        'id' : 4,
        'name' : 'Diamond boots',
        'url' : 'images/diamondBoots.png',
        'isCraftable' : true
    },
    {
        'id' : 5,
        'name' : 'Diamond helmet',
        'url' : 'images/diamondHelmet.png',
        'isCraftable' : true
    },
    {
        'id' : 6,
        'name' : 'Diamond sword',
        'url' : 'images/diamondSword.png',
        'isCraftable' : true
    },
    {
        'id' : 7,
        'name' : 'Sticks for food',
        'url' : 'images/sticks.png',
        'isCraftable' : true
    },
    {
        'id' : 8,
        'name' : 'Flint and steel',
        'url' : 'images/flintAndSteel.png',
        'isCraftable' : true
    },
    {
        'id' : 9,
        'name' : 'Red helmet',
        'url' : 'images/redHelmet.png',
        'isCraftable' : true
    },
    {
        'id' : 10,
        'name' : 'Red',
        'url' : 'images/red.png',
        'isCraftable' : false
    },
    {
        'id' : 11,
        'name' : 'Red sapogi',
        'url' : 'images/galoshi.png',
        'isCraftable' : true
    },
];
const formedRecipes = {
    '4': [
        [2, 0, 2],
        [2, 0, 2]
    ],
    '5': [
        [2, 2, 2],
        [2, 0, 2],
    ],
    '3': [
        [2, 2, 2],
        [0, 1, 0],
        [0, 1, 0]
    ]
};

const unformedRecipes = {
    '9': {'5': 1, '10': 2},
    '11': {'4': 1, '10': 2}
};