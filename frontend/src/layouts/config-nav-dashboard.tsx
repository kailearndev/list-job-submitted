import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    role: ["admin", "user"]
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
    role: ["admin"]
  },
  {
    title: 'Công Ty',
    path: '/company',
    icon: icon('ic-user'),
    role: ["user"]
  },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   role: ["admin", "user"],
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  //   role: ["admin", "user"],
  // },

];
