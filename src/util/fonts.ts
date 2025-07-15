import {Anton, Lato, Playwrite_IE} from 'next/font/google';

export const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-lato',
});

export const playwrite = Playwrite_IE({
  weight: '300',
  variable: '--font-playwrite',
});
