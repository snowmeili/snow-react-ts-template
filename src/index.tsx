import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/*
import './style.scss';
const  element = document.createElement('h2');
element.textContent = 'Hello world';

const  elementDiv = document.createElement('div');

elementDiv.setAttribute('id', 'test');
elementDiv.innerHTML = '<img src="./public/rose.jpg" />'

document.body.appendChild(element);

document.body.appendChild(elementDiv);
*/

ReactDOM.render(
  <App
    {...{
      name: 'snow',
      age: 12,
    }}
  />,
  document.querySelector('#root'),
);
