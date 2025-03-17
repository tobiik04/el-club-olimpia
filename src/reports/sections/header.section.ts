import { Content } from 'pdfmake/interfaces';
import fs from 'fs';

// Cargar imágenes y SVGs
const svgLocation = fs.readFileSync('src/assets/location.svg', 'utf8');
const svgInstagram = fs.readFileSync('src/assets/instagram.svg', 'utf8');
const svgFacebook = fs.readFileSync('src/assets/facebook.svg', 'utf8');
const svgXTwitter = fs.readFileSync('src/assets/x.twitter.svg', 'utf8');
const svgYoutube = fs.readFileSync('src/assets/youtube.svg', 'utf8');
const svgOlimpia = fs.readFileSync('src/assets/olimpia.svg', 'utf8');
const svgWhatsapp = fs.readFileSync('src/assets/whatsapp.svg', 'utf8');
const svgNetwork = fs.readFileSync('src/assets/network.svg', 'utf8');

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  return {
    stack: [
      // Información de contacto
      {
        columns: [
          {
            stack: [
              {
                columns: [
                  { svg: svgLocation, width: 11, margin: [0, 0, 2, 0] },
                  { text: 'Avda. Mariscal López N° 1499', fontSize: 10 },
                ],
              },
              {
                columns: [
                  {
                    svg: svgWhatsapp,
                    width: 9,
                    margin: [1, 0, 1, 0],
                  },
                  {
                    text: '(0984) 79 90 02',
                    fontSize: 10,
                    margin: [2, 0, 0, 0],
                  },
                ],
              },
              {
                columns: [
                  { svg: svgNetwork, width: 11, margin: [0, 0, 5, 0] },
                  {
                    text: 'www.clubolimpia.com.py',
                    fontSize: 10,
                    color: '#0000FF',
                    link: 'http://www.clubolimpia.com.py',
                    margin: [2, 0, 0, 0],
                  },
                ],
              },
            ],
            width: '70%',
          },
        ],
        margin: [80, 25, 40, 0], // Márgenes internos del header
      },

      // Línea horizontal + Logo de Olimpia
      {
        columns: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 340, // Línea más larga
                y2: 0,
                lineWidth: 1,
                lineCap: 'round',
              },
            ],
            width: 'auto',
            margin: [80, 5, 0, 10],
          },
          {
            svg: svgOlimpia,
            width: 60,
            alignment: 'right',
            margin: [0, -30, 0, 0], // Para que no quede pegado
          },
        ],
      },

      // Íconos de redes sociales
      {
        columns: [
          {
            stack: [
              {
                columns: [
                  {
                    svg: svgFacebook,
                    width: 18,
                    margin: [0, -2, 0, 0],
                  },
                  {
                    svg: svgXTwitter,
                    width: 15,
                    margin: [0, 0, 0, -5],
                  },
                  {
                    svg: svgInstagram,
                    width: 15,
                    margin: [10, 0, 0, 0],
                  },
                  {
                    svg: svgYoutube,
                    width: 15,
                    margin: [-10, 0, 0, -5],
                  },
                ],
                columnGap: 2,
              },
            ],
            alignment: 'center',
            margin: [77, -20, 0, 10],
            width: 'auto',
          },
        ],
      },
    ],
  };
};
