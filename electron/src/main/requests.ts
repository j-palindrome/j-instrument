import datamuse from 'datamuse'
import _ from 'lodash'

const mapLightness = (word: string) => {
  const lightToDark = _.reverse(
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'.'.split('')
  )

  return _.sum(word.split('').map((x) => lightToDark.indexOf(x) / lightToDark.length)) / word.length
}

export const getWords = async (word: string) => {
  let meansLike = await datamuse.words({ ml: word })
  let m = _.max(meansLike.map((x) => x.score)) as number

  meansLike = _.map(meansLike, ({ word, score }: { word: string; score: number }) => ({
    word,
    score: score / m,
    lightness: mapLightness(word)
  }))

  let soundsLike = await datamuse.words({ sl: word })

  m = _.max(soundsLike.map((x) => x.score)) as number

  soundsLike = _.map(soundsLike, ({ word, score }: { word: string; score: number }) => ({
    word,
    score: score / m,
    lightness: mapLightness(word)
  }))

  return _.sortBy(meansLike.concat([]), (word) => word.lightness).reverse()
}
