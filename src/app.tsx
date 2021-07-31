import React, { Suspense } from 'react';

import './style.scss';
const Text = React.lazy(() => import('Components/text'));

interface IProps {
  name: string;
  age: number;
}

function App({ name, age }: IProps): JSX.Element {
  return (
    <div className="App">
      qqq3333
      Hello World, {name}, your age: {age}
      <Suspense fallback={<div>loading</div>}>
        <Text />
      </Suspense>
      <img src="../public/rose.jpg" />
    </div>
  );
}

export default App;
