export default class Home {
  title: string;
  content: string;
  
  constructor() {
    this.title = "这是一个简单的标题"
    this.content = "这是简单的内容"
  }

  render() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const titleElement = document.createElement('h2');
    titleElement.textContent = this.title;

    const contentElement = document.createElement('p');
    contentElement.textContent = this.content;

    cardElement.appendChild(titleElement);
    cardElement.appendChild(contentElement);

    return cardElement;
  }
}