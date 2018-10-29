import React from 'react';
import { ThemeProvider as Provider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { createTheme, PropsWithTheme, CSSObject } from '../theme';
import { Root } from './Root';

// IMPORTANT: those styles get injected as global styles
// every other reset style can be applied on Root component
// but not body margin
const tinyNormalizeStyles = {
  body: {
    margin: 0
  }
};

type ThemeProviderProps = Partial<PropsWithTheme> & {
  normalizeStyles?: CSSObject;
  withoutRoot?: boolean;
};

export const ThemeProvider: React.SFC<ThemeProviderProps> = ({
  theme = createTheme(),
  normalizeStyles = tinyNormalizeStyles,
  withoutRoot = false,
  ...rest
}) => (
  <Provider theme={theme}>
    <Global styles={normalizeStyles} />
    {withoutRoot ? rest.children : <Root {...rest} />}
  </Provider>
);
