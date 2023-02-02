import React from 'react';

export function rootContainer(container: any) {
  return React.createElement(typeof container, null, container);
}

// export function patchRoutes({ routes }: any) {
//   routes.unshift({
//     path: '/user',
//     exact: true,
//     component: require('@/extraRoutes/foo').default,
//   });
// }

export function onRouteChange({ matchedRoutes }: any) {
  console.log(matchedRoutes, '=======matchedRoutes')
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
    
    // const moduleRoutes = matchedRoutes[0]?.route?.routes;
    // moduleRoutes.forEach((item: any) => {
    //   item.path = `/base${item.path}`
    // })
  }
}