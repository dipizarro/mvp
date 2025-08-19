import React from 'react';
import { render, screen } from '@testing-library/react';

function HolaMundo() {
  return <h1>¡Hola, mundo!</h1>;
}

describe('Componente HolaMundo', () => {
  it('muestra el texto correctamente', () => {
    render(<HolaMundo />);
    expect(screen.getByText('¡Hola, mundo!')).toBeInTheDocument();
  });
});