import AmmoSelector from './AmmoSelector.svelte'
import { render } from '@testing-library/svelte'

describe('AmmoSelector', () => {
  it('should render the component', async () => {
    const { container } = render(AmmoSelector, {
      props: {
        ammunition: [
          { id: 'test-ammo-id-1', label: 'test-ammo-label-1' },
          { id: 'test-ammo-id-2', label: 'test-ammo-label-2' },
        ],
      },
    })

    expect(container).toMatchSnapshot()
  })
})
