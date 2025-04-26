import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('student/:id', 'routes/student.tsx'),
  route('student/:sid/receipt/:rid', 'routes/receipt.tsx'),
] satisfies RouteConfig;
