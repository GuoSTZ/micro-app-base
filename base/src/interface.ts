export type RoutesType = {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  children?: Array<RoutesType>;
}