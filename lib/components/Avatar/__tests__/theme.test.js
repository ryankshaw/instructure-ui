import { contrast } from '../../../util/color'
import Avatar from '../index'

describe('Avatar.theme', () => {
  describe('with the default theme', () => {
    const variables = Avatar.generateTheme()

    describe('default', () => {
      it('should ensure background color and text color meet 3:1 contrast', () => {
        expect(contrast(variables.background, variables.color))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = Avatar.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure background color and text color meet 4.5:1 contrast', () => {
        expect(contrast(variables.background, variables.color))
          .to.be.above(4.5)
      })
    })
  })
})
