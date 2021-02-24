const items = [
    {
        'id' : 1,
        'name' : 'stick',
        'isCraftable' : false
    },
    {
        'id' : 2,
        'name' : 'diamond',
        'isCraftable' : false
    },
    {
        'id' : 3,
        'name' : 'diamond pick',
        'isCraftable' : true,
        'craft-items-config' : [
            {
                'id' : 1,
                'pos' : [[5, 8]]
            },
            {
                'id' : 2,
                'pos' : [[1, 2, 3]]
            }
        ]
    }
]

for (item of items)
{
    console.log(item)
}