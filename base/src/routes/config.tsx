export const config = {
  'demo': {
    url: ENV === 'development' ? 'http://localhost:8090/' : `${window.location.origin}/demo/`
  },
  'reactTestApp': {
    url: ENV === 'development' ? 'http://localhost:8091/' : `${window.location.origin}/reactTestApp/`
  },
  // 'umiApp': {
  //   url: ENV === 'development' ? 'http://localhost:8092/' : `${window.location.origin}/umiApp/`
  // },
  'vueApp': {
    url: ENV === 'development' ? 'http://localhost:8093/' : `${window.location.origin}/vueApp/`
  },
  'game': {
    url: ENV === 'development' ? 'http://localhost:8001/' : `${window.location.origin}/game/`
  },
  'login': {
    url: ENV === 'development' ? 'http://localhost:8000/' : `${window.location.origin}/login/`
  }
}