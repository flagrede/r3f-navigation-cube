import Soda from './models/Soda'
import Carrot from './models/Carrot'
import Corn from './models/Corn'
import Oil from './models/Oil'
import Popsicle from './models/Popsicle'
import IceCream from './models/IceCream'

const subItems = {
  0: { text: 'Sub menu 1' },
  2: { text: 'Sub menu 2' },
  4: { text: 'Sub menu 3' },
  6: { text: 'Sub menu 4' },
  8: { text: 'Sub menu 5' },
  10: { text: 'Sub menu 6' }
}

export const textFaceMapping = {
  // 14
  0: {
    colors: {
      secondary: '#e3f6f5',
      headline: '#272343',
      paragraph: '#2d334a',
      button: '#ffd803',
      buttonText: '#272343',
      background: '#fffffe'
    },
    text: 'Home',
    model: Popsicle,
    subItems
  },
  // 11
  2: {
    colors: {
      secondary: '#eaddcf',
      headline: '#020826',
      paragraph: '#716040',
      button: '#8c7851',
      buttonText: '#fffffe',
      background: '#f9f4ef'
    },
    text: 'Experience',
    model: Carrot,
    subItems
  },
  // 5
  4: {
    colors: {
      secondary: '#ffa8ba',
      headline: '#00473e',
      paragraph: '#475d5b',
      button: '#faae2b',
      buttonText: '#00473e',
      background: '#f2f7f5'
    },
    text: 'Projects',
    model: Corn,
    subItems
  },
  // 6
  6: {
    colors: {
      secondary: '#d1d1e9',
      headline: '#2b2c34',
      paragraph: '#2b2c34',
      button: '#6246ea',
      buttonText: '#fffffe',
      background: '#fffffe'
    },
    text: 'Blog',
    model: IceCream,
    subItems
  },
  // 12
  8: {
    colors: {
      secondary: '#fffffe',
      headline: '#fffffe',
      paragraph: '#b8c1ec',
      button: '#eebbc3',
      buttonText: '#232946',
      background: '#232946'
    },
    text: 'About',
    model: Soda,
    subItems
  },
  // 10
  10: {
    colors: {
      secondary: '#abd1c6',
      headline: '#fffffe',
      paragraph: '#abd1c6',
      button: '#f9bc60',
      buttonText: '#001e1d',
      background: '#004643'
    },
    text: 'Contact',
    model: Oil,
    subItems
  }
}
