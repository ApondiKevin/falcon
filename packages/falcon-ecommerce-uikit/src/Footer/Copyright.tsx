import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ComponentToReplace } from './ComponentToReplace';

export const CopyrightLayout = themed({
  tag: Box,
  defaultTheme: {
    copyrightLayout: {
      p: 'sm',
      color: 'secondaryText',
      bgFullWidth: 'secondary',
      css: {
        textAlign: 'center'
      }
    }
  }
});

export const Copyright = () => (
  <CopyrightLayout>
    <T id="copyright" year={new Date().getFullYear()} />
    <ComponentToReplace />
  </CopyrightLayout>
);
