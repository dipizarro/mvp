import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
  } from '@react-pdf/renderer';
  
  // 👉 Registra fuentes premium
  Font.register({
    family: 'Playfair',
    src: 'fonts/PlayfairDisplay-Regular.ttf'
  });
  
  Font.register({
    family: 'Lato',
    fonts: [
      {
        src: 'fonts/Lato-Regular.ttf',
        fontWeight: 'normal'
      },
      {
        src: 'fonts/Lato-Bold.ttf',
        fontWeight: 'bold'
      },
      {
        src: 'fonts/Lato-Italic.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic'
      }
    ]
  });
  
  
  // Interfaces
  interface ProfiledItem {
    sign: string;
    profiles: Record<string, string>;
  }
  
  interface IdentityData {
    sun?: ProfiledItem;
    moon?: ProfiledItem;
    ascendant?: ProfiledItem;
  }
  
  interface PlanetData {
    mercury?: ProfiledItem;
    venus?: ProfiledItem;
    mars?: ProfiledItem;
  }
  
  interface AstroReading {
    identity: IdentityData;
    personal_planets: PlanetData;
  }
  
  interface CartaAstralPDFProps {
    data: AstroReading;
    profile: string;
  }
  
  const styles = StyleSheet.create({
    coverPage: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAF9F6',
      color: '#333333',
      padding: 50
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20
    },
    title: {
      fontSize: 30,
      fontFamily: 'Playfair',
      textAlign: 'center',
      marginBottom: 10
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Lato',
      textAlign: 'center',
      marginBottom: 20
    },
    coverText: {
      fontSize: 12,
      fontFamily: 'Lato',
      marginBottom: 2
    },
    slogan: {
      marginTop: 40,
      fontSize: 12,
      fontFamily: 'Lato',
      fontStyle: 'italic'
    },
    tocPage: {
      padding: 50,
      fontFamily: 'Lato',
      fontSize: 12
    },
    tocTitle: {
      fontSize: 20,
      fontFamily: 'Playfair',
      marginBottom: 20
    },
    tocItem: {
      marginBottom: 8
    },
    contentPage: {
      padding: 50,
      fontSize: 12,
      fontFamily: 'Lato'
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Playfair',
      marginBottom: 10,
      color: '#333333'
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#C4A35A',
      borderBottomStyle: 'solid',
      paddingBottom: 4,
      marginBottom: 4
    },
    tableRow: {
      flexDirection: 'row',
      marginBottom: 4
    },
    cell: {
      flex: 1,
      fontSize: 10
    },
    paragraph: {
      marginBottom: 6
    }
  });
  
  export default function CartaAstralPDF({ data, profile }: CartaAstralPDFProps) {
    return (
      <Document>
  
        {/* PORTADA */}
        <Page size="A4" style={styles.coverPage}>
          <Image
            style={styles.logo}
            src="https://via.placeholder.com/80x80.png?text=Logo"
          />
  
          <Text style={styles.title}>✨ Carta Astral Premium ✨</Text>
          <Text style={styles.subtitle}>Interpretación {profile}</Text>
  
          <Text style={styles.coverText}>Sol en {data.identity.sun?.sign}</Text>
          <Text style={styles.coverText}>Luna en {data.identity.moon?.sign}</Text>
          <Text style={styles.coverText}>Ascendente en {data.identity.ascendant?.sign}</Text>
  
          <Text style={styles.slogan}>“Descubre tu potencial cósmico”</Text>
        </Page>
  
        {/* TABLA DE CONTENIDO */}
        <Page size="A4" style={styles.tocPage}>
          <Text style={styles.tocTitle}>Tabla de Contenido</Text>
          <Text style={styles.tocItem}>1. Identidad: Sol, Luna y Ascendente</Text>
          <Text style={styles.tocItem}>2. Planetas Personales</Text>
          <Text style={styles.tocItem}>3. Recomendaciones Finales</Text>
        </Page>
  
        {/* SECCIÓN IDENTIDAD */}
        <Page size="A4" style={styles.contentPage}>
          <Text style={styles.sectionTitle}>1. Identidad</Text>
  
          <Text style={styles.paragraph}>Sol en {data.identity.sun?.sign}</Text>
          <Text style={styles.paragraph}>{data.identity.sun?.profiles[profile]}</Text>
  
          <Text style={styles.paragraph}>Luna en {data.identity.moon?.sign}</Text>
          <Text style={styles.paragraph}>{data.identity.moon?.profiles[profile]}</Text>
  
          <Text style={styles.paragraph}>Ascendente en {data.identity.ascendant?.sign}</Text>
          <Text style={styles.paragraph}>{data.identity.ascendant?.profiles[profile]}</Text>
        </Page>
  
        {/* SECCIÓN PLANETAS */}
        <Page size="A4" style={styles.contentPage}>
          <Text style={styles.sectionTitle}>2. Planetas Personales</Text>
  
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Planeta</Text>
            <Text style={styles.cell}>Signo</Text>
            <Text style={styles.cell}>Interpretación</Text>
          </View>
  
          {['mercury', 'venus', 'mars'].map((planet) => {
            const p = data.personal_planets[planet as keyof PlanetData];
            if (!p) return null;
  
            return (
              <View key={planet} style={styles.tableRow}>
                <Text style={styles.cell}>{planet.charAt(0).toUpperCase() + planet.slice(1)}</Text>
                <Text style={styles.cell}>{p.sign}</Text>
                <Text style={styles.cell}>{p.profiles[profile]}</Text>
              </View>
            );
          })}
        </Page>
  
        {/* SECCIÓN FINAL */}
        <Page size="A4" style={styles.contentPage}>
          <Text style={styles.sectionTitle}>3. Recomendaciones Finales</Text>
          <Text style={styles.paragraph}>
            Gracias por confiar en nosotros para explorar tu universo interior.
            Recuerda que esta carta es una guía: tu libre albedrío es lo más poderoso.
          </Text>
        </Page>
      </Document>
    );
  }
  