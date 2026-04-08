import 'styled-components';

// styled-components 모듈의 DefaultTheme interface 확장 선언
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
      white: string;
      black: string;
      text: string;
      muted: string;
      border: string;
      naver: string;
      kakao: string;
      google: string;
    };
    fonts: {
      main: string;
      code: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: string;
  }
}
