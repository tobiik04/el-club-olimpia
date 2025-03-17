import { sign } from 'crypto';
import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { title } from 'process';
import { headerSection } from './sections/header.section';
import { Content } from 'pdfmake/interfaces';
import fs from 'fs';

export interface IAsociacion {
  nroSocio: number;
  socio: string;
  fechaAsociacion: string;
}

const svgCopas = fs.readFileSync('src/assets/copas.svg', 'utf8');

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 60, 0, 20],
  },
  body: {
    fontSize: 12,
    margin: [0, 0, 0, 20],
    alignment: 'justify',
  },
  signature: {
    fontSize: 12,
    bold: true,
  },
  title: {
    fontSize: 20,
    bold: true,
  },
};

export const getAsociacionReport = (
  values: IAsociacion,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    pageMargins: [60, 130, 60, 80],
    defaultStyle: {
      fontSize: 10,
    },

    header: headerSection({}),

    footer: [
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 350, // Línea más larga
            y2: 0,
            lineWidth: 1,
            lineCap: 'round',
          },
        ],
        margin: [110, -20, 0, 0],
      },
      {
        svg: svgCopas,
        width: 250,
        alignment: 'center',
        margin: [0, 3, 0, 10],
      },
    ],
    content: [
      {
        text: 'Aprobación de Solicitud de Asociación',
        alignment: 'center',
        bold: true,
        fontSize: 16,
      },

      {
        text: `Estimado ${values.socio},`,
        style: 'body',
        margin: [0, 20, 0, 0],
      },

      {
        // text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getFormatedDate(employeeStartDate)}. \n\n
        // Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        // La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        // Esta constancia se expide a solicitud del interesado para los fines que considere conveniente. \n\n`,
        text: `Nos complace informarle que su solicitud para asociarse al Club Olimpia ha sido aprobada. Estamos encantados de darle la bienvenida como el socio número ${values.nroSocio} a nuestra familia y le aseguramos que su experiencia con nosotros será de alto nivel, llena de oportunidades para disfrutar de todos los beneficios que ofrece el club. \n
        A partir de este momento, podrá acceder a las instalaciones y participar en nuestras actividades exclusivas para socios. Le invitamos a asistir a nuestra próxima reunión de bienvenida, donde podrá conocer más sobre los servicios y las actividades disponibles.\n
        Si tiene alguna duda o necesita más información, no dude en ponerse en contacto con nosotros. ¡Esperamos verlo pronto en nuestras instalaciones! \n`,
        alignment: 'justify',
        margin: [0, 20, 0, 15],
      },
      [
        { text: '[Atentamente],', style: 'signature' },
        { text: 'Equipo de Membresías', style: 'signature' },
        { text: 'Club Olimpia', style: 'signature' },
      ],
    ],
  };

  return docDefinition;
};
