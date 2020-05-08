import AmmoGraph from './AmmoGraph.svelte'
import { render } from '@testing-library/svelte'
// import { displayedAmmo, compareAllAmmo } from '../../store.js'

describe('AmmoGraph', () => {
  it('should render the component', async () => {
    const { container } = render(AmmoGraph, {
      props: {
        cartridges: [{ damage: 50, penetration: 60, label: 'ABC' }],
      },
    })

    expect(container).toMatchSnapshot()
  })
})
