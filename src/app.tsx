import React, { Suspense } from 'react';

import './style.scss'

const Text = React.lazy(() => import('Components/text'));

interface IProps {
  name: string;
  age: number;
}

function App({ name, age }: IProps): JSX.Element {
  return (
    <div className="App">
      Hello World, {name}, your age: {age}
      <Suspense fallback={<div>loading</div>}>
        <Text />
      </Suspense>
    </div>
  );
}

export default App;
