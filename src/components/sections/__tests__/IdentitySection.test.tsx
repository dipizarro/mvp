import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IdentitySection from '../IdentitySection';

const mockData = {
  sun: {
    sign: 'Aries',
    profiles: {
      professional: 'Sol profesional',
      spiritual: 'Sol espiritual',
      psychological: 'Sol psicológico',
      youth: 'Sol joven',
    },
  },
  moon: {
    sign: 'Tauro',
    profiles: {
      professional: 'Luna profesional',
      spiritual: 'Luna espiritual',
      psychological: 'Luna psicológica',
      youth: 'Luna joven',
    },
  },
  ascendant: {
    sign: 'Géminis',
    profiles: {
      professional: 'Ascendente profesional',
      spiritual: 'Ascendente espiritual',
      psychological: 'Ascendente psicológico',
      youth: 'Ascendente joven',
    },
  },
};

describe('IdentitySection', () => {
  it('renderiza el título principal si hay datos', () => {
    render(<IdentitySection data={mockData} profile="professional" />);
    expect(screen.getByText(/identidad y personalidad/i)).toBeInTheDocument();
  });

  it('no renderiza nada si no hay datos', () => {
    const { container } = render(<IdentitySection profile="professional" />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza los ítems de Sol, Luna y Ascendente con el signo correcto', () => {
    render(<IdentitySection data={mockData} profile="spiritual" />);
    expect(screen.getByText(/sol en aries/i)).toBeInTheDocument();
    expect(screen.getByText(/luna en tauro/i)).toBeInTheDocument();
    expect(screen.getByText(/ascendente en géminis/i)).toBeInTheDocument();
  });

  it('expande y muestra la descripción del perfil al hacer click en un ítem', () => {
    render(<IdentitySection data={mockData} profile="psychological" />);
    const solBtn = screen.getByText(/sol en aries/i);
    fireEvent.click(solBtn);
    expect(screen.getByText(/sol psicológico/i)).toBeInTheDocument();
  });

  it('expande y contrae todos los ítems con el botón correspondiente', () => {
    render(<IdentitySection data={mockData} profile="youth" />);
    const expandBtn = screen.getByText(/expandir todo/i);
    fireEvent.click(expandBtn);
    expect(screen.getByText(/sol joven/i)).toBeInTheDocument();
    expect(screen.getByText(/luna joven/i)).toBeInTheDocument();
    expect(screen.getByText(/ascendente joven/i)).toBeInTheDocument();
    // Ahora contraer
    fireEvent.click(screen.getByText(/contraer todo/i));
    expect(screen.queryByText(/sol joven/i)).toBeNull();
    expect(screen.queryByText(/luna joven/i)).toBeNull();
    expect(screen.queryByText(/ascendente joven/i)).toBeNull();
  });
}); 