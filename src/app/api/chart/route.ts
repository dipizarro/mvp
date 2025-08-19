import { NextRequest, NextResponse } from 'next/server';

// Tipo para los datos de la carta astral
type ChartRequest = {
  date: string;
  latitude: number;
  longitude: number;
  type: string;
};

// Función para calcular posiciones planetarias (simplificada)
function calculatePlanetaryPositions(date: string, _latitude: number, _longitude: number) {
  // Esta es una implementación simplificada
  // En un entorno real, usarías una librería como swisseph o similar
  
  const birthDate = new Date(date.replace(/\//g, '-'));
  const time = birthDate.getTime();
  
  // Posiciones simplificadas basadas en el tiempo
  const positions = {
    sun: (time % 360) / 360 * 30, // 0-30 grados por signo
    moon: ((time * 1.1) % 360) / 360 * 30,
    mercury: ((time * 0.8) % 360) / 360 * 30,
    venus: ((time * 0.6) % 360) / 360 * 30,
    mars: ((time * 0.4) % 360) / 360 * 30,
    jupiter: ((time * 0.2) % 360) / 360 * 30,
    saturn: ((time * 0.1) % 360) / 360 * 30,
    uranus: ((time * 0.05) % 360) / 360 * 30,
    neptune: ((time * 0.03) % 360) / 360 * 30,
    pluto: ((time * 0.02) % 360) / 360 * 30,
  };

  return positions;
}

// Función para obtener el signo zodiacal
function getZodiacSign(degree: number): string {
  const signs = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
  ];
  const signIndex = Math.floor(degree / 30);
  return signs[signIndex % 12];
}

// Función para generar interpretaciones
function generateInterpretations(positions: Record<string, number>, type: string, name: string) {
  const sunSign = getZodiacSign(positions.sun);
  const moonSign = getZodiacSign(positions.moon);
  
  const interpretations = {
    professional: {
      identity: {
        sun: {
          sign: sunSign,
          profiles: {
            professional: `${name}, tu Sol en ${sunSign} te otorga un carácter ${getProfessionalTraits(sunSign)}. En el ámbito profesional, destacas por tu ${getProfessionalStrengths(sunSign)}.`,
            spiritual: `${name}, tu Sol en ${sunSign} representa tu esencia divina y propósito espiritual.`,
            psychological: `${name}, tu Sol en ${sunSign} revela tu identidad central y motivaciones profundas.`,
            youth: `${name}, tu Sol en ${sunSign} muestra tu personalidad brillante y energía juvenil.`
          }
        },
        moon: {
          sign: moonSign,
          profiles: {
            professional: `Tu Luna en ${moonSign} revela tu naturaleza emocional. En el entorno laboral, necesitas ${getMoonTraits(moonSign)}.`,
            spiritual: `Tu Luna en ${moonSign} conecta con tu intuición y sabiduría interior.`,
            psychological: `Tu Luna en ${moonSign} representa tus necesidades emocionales y patrones inconscientes.`,
            youth: `Tu Luna en ${moonSign} muestra cómo expresas tus emociones y sentimientos.`
          }
        },
        ascendant: {
          sign: getZodiacSign(positions.sun + 30),
          profiles: {
            professional: `Tu Ascendente en ${getZodiacSign(positions.sun + 30)} define tu imagen profesional y primera impresión.`,
            spiritual: `Tu Ascendente en ${getZodiacSign(positions.sun + 30)} revela tu propósito espiritual en esta vida.`,
            psychological: `Tu Ascendente en ${getZodiacSign(positions.sun + 30)} representa tu máscara social y adaptación.`,
            youth: `Tu Ascendente en ${getZodiacSign(positions.sun + 30)} muestra cómo te presentas al mundo.`
          }
        }
      },
      personal_planets: {
        mercury: {
          sign: getZodiacSign(positions.mercury),
          profiles: {
            professional: `Mercurio en ${getZodiacSign(positions.mercury)} define tu estilo de comunicación en el trabajo.`,
            spiritual: `Mercurio en ${getZodiacSign(positions.mercury)} conecta con tu mente espiritual y sabiduría.`,
            psychological: `Mercurio en ${getZodiacSign(positions.mercury)} revela tus patrones de pensamiento.`,
            youth: `Mercurio en ${getZodiacSign(positions.mercury)} muestra cómo aprendes y te comunicas.`
          }
        },
        venus: {
          sign: getZodiacSign(positions.venus),
          profiles: {
            professional: `Venus en ${getZodiacSign(positions.venus)} influye en tus relaciones laborales y valores profesionales.`,
            spiritual: `Venus en ${getZodiacSign(positions.venus)} representa tu capacidad de amar y crear belleza.`,
            psychological: `Venus en ${getZodiacSign(positions.venus)} revela tus necesidades afectivas y valores.`,
            youth: `Venus en ${getZodiacSign(positions.venus)} muestra cómo expresas el amor y la belleza.`
          }
        },
        mars: {
          sign: getZodiacSign(positions.mars),
          profiles: {
            professional: `Marte en ${getZodiacSign(positions.mars)} define tu energía y ambición en la carrera.`,
            spiritual: `Marte en ${getZodiacSign(positions.mars)} representa tu fuerza espiritual y coraje.`,
            psychological: `Marte en ${getZodiacSign(positions.mars)} revela tu agresividad y motivación.`,
            youth: `Marte en ${getZodiacSign(positions.mars)} muestra cómo actúas y persigues tus deseos.`
          }
        }
      },
      social_planets: {
        jupiter: {
          sign: getZodiacSign(positions.jupiter),
          profiles: {
            professional: `Júpiter en ${getZodiacSign(positions.jupiter)} amplifica tus oportunidades de crecimiento profesional.`,
            spiritual: `Júpiter en ${getZodiacSign(positions.jupiter)} expande tu sabiduría espiritual y fe.`,
            psychological: `Júpiter en ${getZodiacSign(positions.jupiter)} representa tu optimismo y filosofía de vida.`,
            youth: `Júpiter en ${getZodiacSign(positions.jupiter)} muestra tu entusiasmo y ganas de aprender.`
          }
        },
        saturn: {
          sign: getZodiacSign(positions.saturn),
          profiles: {
            professional: `Saturno en ${getZodiacSign(positions.saturn)} define tus responsabilidades y límites en la carrera.`,
            spiritual: `Saturno en ${getZodiacSign(positions.saturn)} representa las lecciones kármicas que debes aprender.`,
            psychological: `Saturno en ${getZodiacSign(positions.saturn)} revela tus miedos y áreas de crecimiento.`,
            youth: `Saturno en ${getZodiacSign(positions.saturn)} muestra las responsabilidades que debes asumir.`
          }
        }
      },
      transpersonal_planets: {
        uranus: {
          sign: getZodiacSign(positions.uranus),
          profiles: {
            professional: `Urano en ${getZodiacSign(positions.uranus)} indica innovación y cambios revolucionarios en tu vida.`,
            spiritual: `Urano en ${getZodiacSign(positions.uranus)} conecta con tu genio espiritual y originalidad.`,
            psychological: `Urano en ${getZodiacSign(positions.uranus)} representa tu necesidad de libertad y rebelión.`,
            youth: `Urano en ${getZodiacSign(positions.uranus)} muestra tu lado rebelde y único.`
          }
        },
        neptune: {
          sign: getZodiacSign(positions.neptune),
          profiles: {
            professional: `Neptuno en ${getZodiacSign(positions.neptune)} conecta con tu intuición y creatividad.`,
            spiritual: `Neptuno en ${getZodiacSign(positions.neptune)} representa tu conexión con lo divino y trascendente.`,
            psychological: `Neptuno en ${getZodiacSign(positions.neptune)} revela tus ilusiones y sueños.`,
            youth: `Neptuno en ${getZodiacSign(positions.neptune)} muestra tu imaginación y fantasía.`
          }
        },
        pluto: {
          sign: getZodiacSign(positions.pluto),
          profiles: {
            professional: `Plutón en ${getZodiacSign(positions.pluto)} representa transformación profunda y poder personal.`,
            spiritual: `Plutón en ${getZodiacSign(positions.pluto)} conecta con tu poder espiritual y regeneración.`,
            psychological: `Plutón en ${getZodiacSign(positions.pluto)} revela tus transformaciones psicológicas.`,
            youth: `Plutón en ${getZodiacSign(positions.pluto)} muestra tu intensidad y pasión.`
          }
        }
      },
      houses: {
        "1": {
          sign: getZodiacSign(positions.sun),
          profiles: {
            professional: "Tu identidad y apariencia personal en el ámbito profesional.",
            spiritual: "Tu propósito espiritual y conexión con el yo superior.",
            psychological: "Tu identidad central y cómo te percibes a ti mismo.",
            youth: "Cómo te presentas al mundo y tu personalidad."
          }
        },
        "2": {
          sign: getZodiacSign(positions.sun + 30),
          profiles: {
            professional: "Tus valores y recursos materiales en la carrera.",
            spiritual: "Tus valores espirituales y recursos internos.",
            psychological: "Tus valores personales y autoestima.",
            youth: "Lo que valoras y tus posesiones materiales."
          }
        },
        "3": {
          sign: getZodiacSign(positions.sun + 60),
          profiles: {
            professional: "Comunicación y relaciones cercanas en el trabajo.",
            spiritual: "Tu comunicación espiritual y aprendizaje divino.",
            psychological: "Tu forma de pensar y comunicarte.",
            youth: "Tu comunicación y relaciones con hermanos."
          }
        },
        "4": {
          sign: getZodiacSign(positions.sun + 90),
          profiles: {
            professional: "Tu entorno laboral y base de operaciones.",
            spiritual: "Tu hogar espiritual y conexión con ancestros.",
            psychological: "Tu hogar emocional y raíces familiares.",
            youth: "Tu hogar y familia."
          }
        },
        "5": {
          sign: getZodiacSign(positions.sun + 120),
          profiles: {
            professional: "Creatividad y proyectos personales en la carrera.",
            spiritual: "Tu creatividad espiritual y expresión divina.",
            psychological: "Tu creatividad y expresión personal.",
            youth: "Tu creatividad y romance."
          }
        },
        "6": {
          sign: getZodiacSign(positions.sun + 150),
          profiles: {
            professional: "Tu trabajo diario y salud en la profesión.",
            spiritual: "Tu servicio espiritual y salud holística.",
            psychological: "Tu trabajo y rutinas diarias.",
            youth: "Tu trabajo y salud."
          }
        },
        "7": {
          sign: getZodiacSign(positions.sun + 180),
          profiles: {
            professional: "Relaciones y asociaciones profesionales.",
            spiritual: "Tu pareja espiritual y equilibrio divino.",
            psychological: "Tus relaciones íntimas y socios.",
            youth: "Tus relaciones y asociaciones."
          }
        },
        "8": {
          sign: getZodiacSign(positions.sun + 210),
          profiles: {
            professional: "Recursos compartidos y transformación en la carrera.",
            spiritual: "Transformación espiritual y recursos ocultos.",
            psychological: "Transformación psicológica y recursos compartidos.",
            youth: "Transformación y recursos de otros."
          }
        },
        "9": {
          sign: getZodiacSign(positions.sun + 240),
          profiles: {
            professional: "Filosofía y viajes relacionados con el trabajo.",
            spiritual: "Tu filosofía espiritual y viajes del alma.",
            psychological: "Tu filosofía de vida y búsqueda de significado.",
            youth: "Tu filosofía y viajes."
          }
        },
        "10": {
          sign: getZodiacSign(positions.sun + 270),
          profiles: {
            professional: "Tu carrera y reputación profesional.",
            spiritual: "Tu misión espiritual y propósito divino.",
            psychological: "Tu carrera y ambiciones personales.",
            youth: "Tu carrera y reputación."
          }
        },
        "11": {
          sign: getZodiacSign(positions.sun + 300),
          profiles: {
            professional: "Amistades y grupos sociales en el ámbito profesional.",
            spiritual: "Tu comunidad espiritual y conexiones divinas.",
            psychological: "Tus amistades y grupos sociales.",
            youth: "Tus amistades y grupos sociales."
          }
        },
        "12": {
          sign: getZodiacSign(positions.sun + 330),
          profiles: {
            professional: "Espiritualidad y subconsciente en el trabajo.",
            spiritual: "Tu conexión espiritual y trascendencia.",
            psychological: "Tu subconsciente y áreas ocultas.",
            youth: "Tu espiritualidad y subconsciente."
          }
        }
      }
    }
  };

  return interpretations[type as keyof typeof interpretations] || interpretations.professional;
}

// Funciones auxiliares
function getProfessionalTraits(sign: string): string {
  const traits: { [key: string]: string } = {
    'Aries': 'liderazgo y determinación',
    'Tauro': 'perseverancia y estabilidad',
    'Géminis': 'versatilidad y comunicación',
    'Cáncer': 'intuición y cuidado',
    'Leo': 'creatividad y carisma',
    'Virgo': 'precisión y eficiencia',
    'Libra': 'diplomacia y equilibrio',
    'Escorpio': 'intensidad y transformación',
    'Sagitario': 'optimismo y expansión',
    'Capricornio': 'ambición y responsabilidad',
    'Acuario': 'innovación y humanitarismo',
    'Piscis': 'compasión y espiritualidad'
  };
  return traits[sign] || 'determinación';
}

function getProfessionalStrengths(sign: string): string {
  const strengths: { [key: string]: string } = {
    'Aries': 'capacidad de iniciar proyectos',
    'Tauro': 'constancia en el trabajo',
    'Géminis': 'adaptabilidad a cambios',
    'Cáncer': 'intuición para los negocios',
    'Leo': 'liderazgo natural',
    'Virgo': 'atención al detalle',
    'Libra': 'habilidades de negociación',
    'Escorpio': 'capacidad de investigación',
    'Sagitario': 'visión de futuro',
    'Capricornio': 'planificación estratégica',
    'Acuario': 'pensamiento innovador',
    'Piscis': 'creatividad artística'
  };
  return strengths[sign] || 'liderazgo';
}

function getMoonTraits(sign: string): string {
  const traits: { [key: string]: string } = {
    'Aries': 'un entorno dinámico y desafiante',
    'Tauro': 'estabilidad y seguridad emocional',
    'Géminis': 'variedad y comunicación constante',
    'Cáncer': 'un ambiente familiar y protector',
    'Leo': 'reconocimiento y creatividad',
    'Virgo': 'orden y eficiencia',
    'Libra': 'armonía y colaboración',
    'Escorpio': 'profundidad y transformación',
    'Sagitario': 'libertad y expansión',
    'Capricornio': 'estructura y responsabilidad',
    'Acuario': 'independencia e innovación',
    'Piscis': 'compasión y espiritualidad'
  };
  return traits[sign] || 'estabilidad';
}

export async function POST(request: NextRequest) {
  try {
    const body: ChartRequest = await request.json();
    
    // Validar datos de entrada
    if (!body.date || !body.latitude || !body.longitude || !body.type) {
      return NextResponse.json(
        { error: 'Datos incompletos. Se requieren date, latitude, longitude y type.' },
        { status: 400 }
      );
    }

    // Calcular posiciones planetarias
    const positions = calculatePlanetaryPositions(body.date, body.latitude, body.longitude);
    
    // Generar interpretaciones
    const reading = generateInterpretations(positions, body.type, 'Usuario');

    return NextResponse.json({
      success: true,
      reading,
      positions
    });

  } catch (error) {
    console.error('Error en el endpoint /api/chart:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 