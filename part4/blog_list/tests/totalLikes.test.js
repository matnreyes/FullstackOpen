const listHelper = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  const multiBlog = [
    { likes: 1 },
    { likes: 2 },
    { likes: 3 },
    { likes: 4 }
  ]

  const listWithOneBlog = [
    { likes: 34 }
  ]

  const emptyList = []

  test('when list has multiple blogs', () => {
    const result = listHelper(multiBlog)
    expect(result).toBe(10)
  })

  test('when list only has one blog', () => {
    const result = listHelper(listWithOneBlog)
    expect(result).toBe(34)
  })

  test('when list is empty', () => {
    const result = listHelper(emptyList)
    expect(result).toBe(0)
  })
})