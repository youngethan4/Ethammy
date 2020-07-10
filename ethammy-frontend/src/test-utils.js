//to be used with connected components
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './reducers/registerReducer';

const middleware = [thunk];

function render(ui, {
    initialState,
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware)
    )),
    ...renderOptions
  } = {}
){
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
//overrides render method from react testing library
export { render }