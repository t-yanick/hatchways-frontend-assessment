import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import Students from '../components/Students';

describe('Creates a component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Students />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
})