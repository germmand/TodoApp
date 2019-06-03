import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { RawAuthLayout } from '../../../src/layouts/Auth/AuthLayout';

describe('Authentication Layout', () => {
  it('matches snapshot', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: { },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: () => { },
        replace: () => { },
      },
    };
    const AuthLayoutComponent = renderer.create(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    expect(AuthLayoutComponent.toJSON()).toMatchSnapshot();
  });

  it('changes route to Dashboard if user logged in on first rendering', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: true,
      location: { },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: () => { },
        replace: jest.fn(),
      },
    };
    mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    expect(props.history.replace).toHaveBeenCalledWith('/home/Dashboard');
  });

  it('changes route to Dashboard if user logs in', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: { },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: () => { },
        replace: jest.fn(),
      },
    };
    const AuthLayoutComponent = mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    const updatedProps = {
      ...props,
      isLoggedIn: true,
    };
    AuthLayoutComponent.setProps({
      children: <RawAuthLayout {...updatedProps} />,
    });
    expect(props.history.replace).toHaveBeenCalledWith('/home/Dashboard');
  });

  it('changes route to signup correctly', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: {
        pathname: '/auth/login',
      },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: jest.fn(),
        replace: () => { },
      },
    };
    const AuthLayoutComponent = mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    const SignupButton = AuthLayoutComponent.find('Button')
      .filterWhere(s => s.props().id === 'signupButton');
    SignupButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/auth/signup');
  });

  it('does not change route to signup if already there', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: {
        pathname: '/auth/signup',
      },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: jest.fn(),
        replace: () => { },
      },
    };
    const AuthLayoutComponent = mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    const SignupButton = AuthLayoutComponent.find('Button')
      .filterWhere(s => s.props().id === 'signupButton');
    SignupButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(0);
  });

  it('changes route to login correctly', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: {
        pathname: '/auth/signup',
      },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: jest.fn(),
        replace: () => { },
      },
    };
    const AuthLayoutComponent = mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    const LoginButton = AuthLayoutComponent.find('Button')
      .filterWhere(s => s.props().id === 'loginButton');
    LoginButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/auth/login');
  });

  it('does not change route to login if already there', () => {
    const props = {
      classes: {
        grow: 'grow-auth-layout-class',
        viewContainer: 'view-container-auth-layout-class',
      },
      isLoggedIn: false,
      location: {
        pathname: '/auth/login',
      },
      history: {
        action: '',
        block: () => { },
        createHref: () => { },
        go: () => { },
        goBack: () => { },
        goForward: () => { },
        length: 1,
        listen: () => { },
        location: { },
        push: jest.fn(),
        replace: () => { },
      },
    };
    const AuthLayoutComponent = mount(
      <MemoryRouter>
        <RawAuthLayout {...props} />
      </MemoryRouter>,
    );
    const LoginButton = AuthLayoutComponent.find('Button')
      .filterWhere(s => s.props().id === 'loginButton');
    LoginButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(0);
  });
});
