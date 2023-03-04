// import Tabs from "./components/Tabs";
import App from './views'

const root = document.getElementById('root');

const app = new App({
  title: "标题",
  content: "123456"
}).render()

root.appendChild(app)


