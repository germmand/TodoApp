import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import debounce from 'lodash/debounce';

import { RawLogin } from '../../../src/views/Auth/Login';

jest.mock('lodash/debounce');

describe('Login component', () => {
  beforeEach(() => {
    debounce.mockImplementation(fn => fn);
  });

  it('matches snapshot', () => {
    const props = {
      classes: {
        container: 'container-class',
        root: 'root-class',
        content: 'content-class',
        topDivider: 'topDivider-class',
        fields: 'fields-class',
        textField: 'textField-class',
        signInButton: 'signInButton-class',
      },
      isLogginIn: false,
      login: jest.fn(),
    };
    const LoginComponent = renderer.create(<RawLogin {...props} />);
    expect(LoginComponent.toJSON()).toMatchSnapshot();
  });

  it('calls login action creator on sign in', () => {
    const props = {
      classes: {
        signInButton: 'signInButton-class',
      },
      isLogginIn: false,
      authError: {
        username: ['This field can\'t be blank.'],
      },
      login: jest.fn(() => Promise.resolve({})),
    };
    const credentials = {
      username: 'test_user',
      password: 'test_password',
    };
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    LoginComponent.setState({ values: credentials }, () => {
      const LoginButton = LoginComponent.find('Button')
        .filterWhere(s => s.props()
          .className
          .includes(props.classes.signInButton));
      expect(LoginButton).toHaveLength(1);
      LoginButton.simulate('click');
      expect(props.login).toHaveBeenCalledWith(credentials);
    });
  });

  it('shows server auth errors is wasSubmitted is true', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      authError: {
        username: ['This field can\'t be blank.'],
      },
      login: jest.fn(() => Promise.resolve({})),
    };
    let LoginComponent = mount(<RawLogin {...props} />).find('Login');
    LoginComponent.setState({ wasSubmitted: true }, () => {
      LoginComponent = LoginComponent.update().find('Login');
      const ServerAuthErrorsComponent = LoginComponent.find('ServerAuthErrors');
      expect(ServerAuthErrorsComponent).toHaveLength(1);
      expect(ServerAuthErrorsComponent.props().errors).toEqual(props.authError);
    });
  });

  it('sets wasSubmitted to true if sign in button is clicked', () => {
    const props = {
      classes: {
        signInButton: 'signInButton-class',
      },
      isLogginIn: false,
      authError: {
        username: ['This field can\'t be blank.'],
      },
      login: jest.fn(() => Promise.resolve({})),
    };
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const LoginButton = LoginComponent.find('Button')
      .filterWhere(s => s.props()
        .className
        .includes(props.classes.signInButton));
    expect(LoginButton).toHaveLength(1);
    LoginButton.find('button').simulate('click');
    setImmediate(() => {
      expect(LoginComponent.state().wasSubmitted).toBeTruthy();
    });
  });

  it('username is updated successfully on state when change event occurs', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const username = 'test_user';
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const UsernameInput = LoginComponent.find('TextField')
      .filterWhere(s => s.props()
        .name === 'username');
    expect(UsernameInput).toHaveLength(1);
    UsernameInput.props().onChange({ target: { value: username } });
    expect(LoginComponent.state().values.username).toEqual(username);
    expect(LoginComponent.state().touched.username).toBeTruthy();
    expect(LoginComponent.state().errors.username).toEqual(undefined);
  });

  it('username errors are placed in state correctly when errors on username input', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const username = '';
    const errorsExpected = ['Username is required'];
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const UsernameInput = LoginComponent.find('TextField')
      .filterWhere(s => s.props()
        .name === 'username');
    expect(UsernameInput).toHaveLength(1);
    UsernameInput.props().onChange({ target: { value: username } });
    expect(LoginComponent.state().values.username).toEqual(username);
    expect(LoginComponent.state().touched.username).toBeTruthy();
    expect(LoginComponent.state().errors.username).toEqual(errorsExpected);
  });

  it('password is updated successfully on state when change event occurs', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const password = 'super_password';
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const PasswordInput = LoginComponent.find('TextField')
      .filterWhere(s => s.props()
        .name === 'password');
    expect(PasswordInput).toHaveLength(1);
    PasswordInput.props().onChange({ target: { value: password } });
    expect(LoginComponent.state().values.password).toEqual(password);
    expect(LoginComponent.state().touched.password).toBeTruthy();
    expect(LoginComponent.state().errors.password).toEqual(undefined);
  });

  it('password errors are placed in state correctly when errors on password input', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const password = '';
    const errorsExpected = ['Password is required'];
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const PasswordInput = LoginComponent.find('TextField')
      .filterWhere(s => s.props()
        .name === 'password');
    expect(PasswordInput).toHaveLength(1);
    PasswordInput.props().onChange({ target: { value: password } });
    expect(LoginComponent.state().values.password).toEqual(password);
    expect(LoginComponent.state().touched.password).toBeTruthy();
    expect(LoginComponent.state().errors.password).toEqual(errorsExpected);
  });

  it('renders client-side username errors', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const state = {
      touched: {
        username: true,
      },
      errors: {
        username: ['Username is required.'],
      },
    };
    let LoginComponent = mount(<RawLogin {...props} />).find('Login');
    LoginComponent.setState({ ...state }, () => {
      LoginComponent = LoginComponent.update().find('Login');
      const UsernameTypographyError = LoginComponent.find('Typography')
        .filterWhere(s => s.props().id === 'usernameFieldError');
      expect(UsernameTypographyError).toHaveLength(1);
      expect(UsernameTypographyError.text()).toEqual(state.errors.username[0]);
    });
  });

  it('renders client-side password errors', () => {
    const props = {
      classes: { },
      isLogginIn: false,
      login: jest.fn(() => Promise.resolve({})),
    };
    const state = {
      touched: {
        password: true,
      },
      errors: {
        password: ['Password is required.'],
      },
    };
    let LoginComponent = mount(<RawLogin {...props} />).find('Login');
    LoginComponent.setState({ ...state }, () => {
      LoginComponent = LoginComponent.update().find('Login');
      const PasswordTypographyError = LoginComponent.find('Typography')
        .filterWhere(s => s.props().id === 'passwordFieldError');
      expect(PasswordTypographyError).toHaveLength(1);
      expect(PasswordTypographyError.text()).toEqual(state.errors.password[0]);
    });
  });

  it('replaces Button to CircularProgress when isLogginIn is true', () => {
    const props = {
      classes: {
        signInButton: 'signInButton-class',
        progress: 'progress-class',
      },
      isLogginIn: true,
      login: jest.fn(() => Promise.resolve({})),
    };
    const LoginComponent = mount(<RawLogin {...props} />).find('Login');
    const CircularProgress = LoginComponent.find('CircularProgress')
      .filterWhere(s => s.props().className.includes(props.classes.progress));
    const LoginButton = LoginComponent.find('Button')
      .filterWhere(s => s.props().className.includes(props.classes.signInButton));
    expect(CircularProgress).toHaveLength(1);
    expect(LoginButton).toHaveLength(0);
  });
});
