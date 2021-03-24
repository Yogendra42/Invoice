import React from 'react';
import Invoice from './Invoice';
import '../css/App.css';
import { Container } from 'reactstrap';

function App() {
  // as whole is validated it should be kept in single component
  return (
    <Container className="App p-4">
      <Invoice />
    </Container>
  );
}

export default App;
