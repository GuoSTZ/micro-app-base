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