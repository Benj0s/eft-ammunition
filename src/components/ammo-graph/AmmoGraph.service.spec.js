import { maxAndPad, generateTicks } from './AmmoGraph.service'

describe('AmmoGraph.service', () => {
  describe('maxAndPad', () => {
    it('should return a max value with default padding applied', () => {
      expect(maxAndPad([0, 25, 50, 75, 100])).toEqual(100)
    })
    it('should return a max value with padding of 40 applied', () => {
      expect(maxAndPad([0, 25, 50, 75, 100], 40)).toEqual(120)
    })
  })
  describe('generateTicks', () => {
    it('should return an array of tick using deafult padding', () => {
      expect(generateTicks(50)).toEqual([0, 10, 20, 30, 40, 50])
    })
    it('should return an array of tick using deafult padding', () => {
      expect(generateTicks(50, 25)).toEqual([0, 25, 50])
    })
  })
})
