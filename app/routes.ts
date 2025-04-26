import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('student/:id', 'routes/student.tsx'),
] satisfies RouteConfig;
