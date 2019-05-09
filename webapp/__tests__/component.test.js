import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

const DummyComponent = ({ text }) => (
    <div>
        <h2 className="sup">{text}</h2>
    </div>
);
DummyComponent.propTypes = {
  text: PropTypes.string,
};
DummyComponent.defaultProps = {
  text: 'Hallo!',
};

describe('dummyComponent', () => {
  it('testing dummyComponent', () => {
    const myText = 'Hey there!';
    const dummy = mount(<DummyComponent text={myText}/>);
    const text = dummy.find('.sup').text();
    expect(text).toEqual(myText);
  });
});
