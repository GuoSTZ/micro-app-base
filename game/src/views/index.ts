import Tabs from '../components/Tabs';
import HomeView from './Home'

interface IProps {
  title: string;
  content: string;
}

export default class App {
  title: string;
  content: string;

  constructor(props: IProps) {
    this.title = props.title;
    this.content = props.content;
  }

  render() {
    const data = [
      {
        key: '1',
        label: `Tab 1`,
        children: new HomeView().render(),
      },
      {
        key: '2',
        label: `Tab 2`,
        children: `Content of Tab Pane 2`,
      },
      {
        key: '3',
        label: `Tab 3`,
        children: `Content of Tab Pane 3`,
      },
    ]
    const tabs = new Tabs({data})
    
    return tabs.render()
  }
}