type DataType = {
  title: string;
  content: HTMLElement;
}

interface TabsProps {
  data: DataType[]
}

export default class Tabs {
  data: TabsProps['data'];

  constructor(props: TabsProps) {
    this.data = props.data || [];
  }

  render() {
    const TabsDiv = document.createElement('div')
    TabsDiv.className = "tabs"
    const items = this.data?.map((item: DataType) => {
      const itemDiv = document.createElement('div')
      itemDiv.className = 'tabs-item'
      return itemDiv;
    })
  }
}