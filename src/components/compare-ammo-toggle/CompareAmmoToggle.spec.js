import CompareAmmoToggle from './CompareAmmoToggle.svelte'
import { render } from '@testing-library/svelte'

describe('CompareAmmoToggle', () => {
  it('should render the component with toggle off by default', async () => {
    const { getByRole, container } = render(CompareAmmoToggle)
    const switchEl = getByRole('switch')

    expect(switchEl.getAttribute('aria-checked')).toEqual('false')

    expect(container).toMatchSnapshot();
  })
})
