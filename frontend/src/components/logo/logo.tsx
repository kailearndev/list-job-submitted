import type { BoxProps } from '@mui/material/Box';

import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const theme = useTheme();

    const gradientId = useId();

    const TEXT_PRIMARY = theme.vars.palette.text.primary;
    const PRIMARY_LIGHT = theme.vars.palette.primary.light;
    const PRIMARY_MAIN = theme.vars.palette.primary.main;
    const PRIMARY_DARKER = theme.vars.palette.primary.dark;

    /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <Box
        alt="Single logo"
        component="img"
        src={`/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <Box
        alt="Full logo"
        component="img"
        src={`/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

    const singleLogo = (
      <svg fill="#000000" width="32px" height="32px" viewBox="-0.96 -0.96 33.92 33.92" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.256" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">

        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"> <title>kaios</title> <path d="M15.466 10.211c-0.001 0-0.001 0-0.002 0-1.883 0-3.41 1.527-3.41 3.41 0 0.733 0.231 1.411 0.624 1.967l-0.007-0.011 9.761 13.939c0.623 0.898 1.649 1.479 2.811 1.479 1.883 0 3.41-1.527 3.41-3.41 0-0.743-0.238-1.431-0.641-1.991l0.007 0.010-9.761-13.939c-0.624-0.883-1.641-1.453-2.791-1.454h-0zM6.782 1.204c-0.001 0-0.001 0-0.002 0-1.895 0-3.431 1.536-3.431 3.431 0 0.001 0 0.001 0 0.002v-0 22.702c-0 0.015-0 0.033-0 0.050 0 1.896 1.537 3.433 3.433 3.433s3.433-1.537 3.433-3.433c0-0.018-0-0.035-0-0.053l0 0.003v-22.702c-0.001-1.895-1.537-3.431-3.432-3.433h-0zM22.675 1.004c-2.521 0.019-4.557 2.067-4.557 4.59 0 2.535 2.055 4.591 4.591 4.591s4.591-2.055 4.591-4.591c0-1.277-0.521-2.431-1.362-3.263l-0-0c-0.829-0.82-1.969-1.327-3.228-1.327-0.012 0-0.024 0-0.036 0h0.002z" /> </g>

        <g id="SVGRepo_iconCarrier"> <title>kaios</title> <path d="M15.466 10.211c-0.001 0-0.001 0-0.002 0-1.883 0-3.41 1.527-3.41 3.41 0 0.733 0.231 1.411 0.624 1.967l-0.007-0.011 9.761 13.939c0.623 0.898 1.649 1.479 2.811 1.479 1.883 0 3.41-1.527 3.41-3.41 0-0.743-0.238-1.431-0.641-1.991l0.007 0.010-9.761-13.939c-0.624-0.883-1.641-1.453-2.791-1.454h-0zM6.782 1.204c-0.001 0-0.001 0-0.002 0-1.895 0-3.431 1.536-3.431 3.431 0 0.001 0 0.001 0 0.002v-0 22.702c-0 0.015-0 0.033-0 0.050 0 1.896 1.537 3.433 3.433 3.433s3.433-1.537 3.433-3.433c0-0.018-0-0.035-0-0.053l0 0.003v-22.702c-0.001-1.895-1.537-3.431-3.432-3.433h-0zM22.675 1.004c-2.521 0.019-4.557 2.067-4.557 4.59 0 2.535 2.055 4.591 4.591 4.591s4.591-2.055 4.591-4.591c0-1.277-0.521-2.431-1.362-3.263l-0-0c-0.829-0.82-1.969-1.327-3.228-1.327-0.012 0-0.024 0-0.036 0h0.002z" /> </g>

      </svg>
    );

    const fullLogo = (
      <svg fill="#000000" width="32px" height="32px" viewBox="-0.96 -0.96 33.92 33.92" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.256" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">

        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"> <title>kaios</title> <path d="M15.466 10.211c-0.001 0-0.001 0-0.002 0-1.883 0-3.41 1.527-3.41 3.41 0 0.733 0.231 1.411 0.624 1.967l-0.007-0.011 9.761 13.939c0.623 0.898 1.649 1.479 2.811 1.479 1.883 0 3.41-1.527 3.41-3.41 0-0.743-0.238-1.431-0.641-1.991l0.007 0.010-9.761-13.939c-0.624-0.883-1.641-1.453-2.791-1.454h-0zM6.782 1.204c-0.001 0-0.001 0-0.002 0-1.895 0-3.431 1.536-3.431 3.431 0 0.001 0 0.001 0 0.002v-0 22.702c-0 0.015-0 0.033-0 0.050 0 1.896 1.537 3.433 3.433 3.433s3.433-1.537 3.433-3.433c0-0.018-0-0.035-0-0.053l0 0.003v-22.702c-0.001-1.895-1.537-3.431-3.432-3.433h-0zM22.675 1.004c-2.521 0.019-4.557 2.067-4.557 4.59 0 2.535 2.055 4.591 4.591 4.591s4.591-2.055 4.591-4.591c0-1.277-0.521-2.431-1.362-3.263l-0-0c-0.829-0.82-1.969-1.327-3.228-1.327-0.012 0-0.024 0-0.036 0h0.002z" /> </g>

        <g id="SVGRepo_iconCarrier"> <title>kaios</title> <path d="M15.466 10.211c-0.001 0-0.001 0-0.002 0-1.883 0-3.41 1.527-3.41 3.41 0 0.733 0.231 1.411 0.624 1.967l-0.007-0.011 9.761 13.939c0.623 0.898 1.649 1.479 2.811 1.479 1.883 0 3.41-1.527 3.41-3.41 0-0.743-0.238-1.431-0.641-1.991l0.007 0.010-9.761-13.939c-0.624-0.883-1.641-1.453-2.791-1.454h-0zM6.782 1.204c-0.001 0-0.001 0-0.002 0-1.895 0-3.431 1.536-3.431 3.431 0 0.001 0 0.001 0 0.002v-0 22.702c-0 0.015-0 0.033-0 0.050 0 1.896 1.537 3.433 3.433 3.433s3.433-1.537 3.433-3.433c0-0.018-0-0.035-0-0.053l0 0.003v-22.702c-0.001-1.895-1.537-3.431-3.432-3.433h-0zM22.675 1.004c-2.521 0.019-4.557 2.067-4.557 4.59 0 2.535 2.055 4.591 4.591 4.591s4.591-2.055 4.591-4.591c0-1.277-0.521-2.431-1.362-3.263l-0-0c-0.829-0.82-1.969-1.327-3.228-1.327-0.012 0-0.024 0-0.036 0h0.002z" /> </g>

      </svg>
    );

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
