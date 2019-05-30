import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ServerAuthErrors from '../../src/components/ServerAuthErrors';
import capitalizeFirstLetter from '../../src/common/functions/capitalizeFirstLetter';

describe('ServerAuthErrors Component', () => {
  it('renders ServerAuthErrors component correctly', () => {
    const props = {
      classes: {
        root: 'root-container',
      },
      errors: {
        credentials: ['No account was found with given credentials.'],
      },
    };
    const ServerAuthErrorsComponent = renderer.create(<ServerAuthErrors {...props} />);
    expect(ServerAuthErrorsComponent.toJSON()).toMatchSnapshot();
  });

  it('replaces \'non_field_errors\' with \'Credentials\'', () => {
    const props = {
      classes: {
        root: 'root-container',
      },
      errors: {
        non_field_errors: ['No account was found with given credentials.'],
      },
    };
    const ServerAuthErrorsComponent = mount(<ServerAuthErrors {...props} />);
    const ListItemTextComponents = ServerAuthErrorsComponent.find('ListItemText');
    expect(ListItemTextComponents).toHaveLength(1);
    expect(ListItemTextComponents.at(0).props().primary).toEqual('Credentials');
  });

  it('capitalizes first letter on primary errors', () => {
    const props = {
      classes: {
        root: 'root-container',
      },
      errors: {
        username: ['This field can\'t be blank.'],
      },
    };
    const expectedErrorTitle = capitalizeFirstLetter(Object.keys(props.errors)[0]);
    const ServerAuthErrorsComponent = mount(<ServerAuthErrors {...props} />);
    const ListItemTextComponents = ServerAuthErrorsComponent.find('ListItemText');
    expect(ListItemTextComponents).toHaveLength(1);
    expect(ListItemTextComponents.at(0).props().primary).toEqual(expectedErrorTitle);
  });

  it('renders first error description message properly on secondary', () => {
    const props = {
      classes: {
        root: 'root-container',
      },
      errors: {
        username: ['This field can\'t be blank.'],
      },
    };
    const ServerAuthErrorsComponent = mount(<ServerAuthErrors {...props} />);
    const ListItemTextComponents = ServerAuthErrorsComponent.find('ListItemText');
    expect(ListItemTextComponents).toHaveLength(1);
    expect(ListItemTextComponents.at(0).props().secondary).toEqual(props.errors.username[0]);
  });
});
