import React, {Component, ReactElement} from "react";

interface Props {
  startValue?: number,
  increment?: number
}

interface State {
  counter: number
}

export default class ClassCounter extends React.Component<Props, State>{
//   intervalId?: number;
// ! bedeutet, der Wert wurde zugewiesen
  intervalId!: number;

  constructor(props: Props){
    super(props);

    this.state = {
      counter: props.startValue || 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(): void{
    // Durch die Funktion in setState bekommt man den aktuellsten Zustand
    // setState ist asynchron
    this.intervalId = window.setInterval(() => {
      this.setState((state) => (
        {counter: state.counter + 1}
      ))
    } , 1000)
  }

  componentWillUnmount(): void{
    window.clearInterval(this.intervalId);
  }

  handleClick(): void {
    this.setState((state) => (
      {counter: state.counter + 1}
    ))
  }

  render(): ReactElement{
    const {counter} = this.state;
    return(
      <div className="counter" onClick={this.handleClick}>
        <p>Counter: {counter}</p>
      </div>
    )
  }
}