import { tick } from 'svelte'
import { render, waitFor, screen } from '@testing-library/svelte'

import Header from './Header.svelte'
import ammunitionDataServiceMock from '../../services/ammunition.data.service.js'
// import ChildMock from '../../../__mocks__/childMock.svelte'

jest.mock('../../services/ammunition.data.service.js')

jest.mock('../ammo-selector/AmmoSelector.svelte', () => ({
  default: require('../../../__mocks__/childMock.svelte'),
}))

describe('Header', () => {
  it.skip('should render the component', async () => {
    ammunitionDataServiceMock.list.mockResolvedValueOnce([
      {
        id: 'test-ammo-id',
        label: 'test-ammo-label',
        class: 'test-ammo-class',
      },
    ])

    const { container } = render(Header)

    await waitFor(() => screen.getByTestId('header-actions'))
    await tick()
    // const header = screen.getByTestId('header')
    expect(container).toMatchSnapshot()
  })
})
