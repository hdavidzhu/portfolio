/// <reference path="../typings/react/react.d.ts" />
import React = __React;

class DemoProps {
  public name: string;
  public age: number;
}

class Demo extends React.Component<DemoProps, any> {
  private foo: number;
  
  constructor(props:DemoProps) {
    super(props);
    this.foo = 42;
  }
  
  render() {
    return (
      <div>Hello world!</div>
    );
  }
}
