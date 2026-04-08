// src/utils/media.ts
import { theme } from '../styles/theme';

const customMediaQuery = (minWidth: string): string =>
  `@media (min-width: ${minWidth})`;

export const media = {
  xs: customMediaQuery(theme.breakpoints.xs),
  sm: customMediaQuery(theme.breakpoints.sm),
  md: customMediaQuery(theme.breakpoints.md),
  lg: customMediaQuery(theme.breakpoints.lg),
  xl: customMediaQuery(theme.breakpoints.xl),
  xxl: customMediaQuery(theme.breakpoints.xxl),
  custom: customMediaQuery,
};

// 사용 예시:
// ${media.md} {
//   /* 768px 이상일 때 적용될 스타일 */
// }