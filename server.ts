import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Gemini AI Client setup
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for SENA AI Assistant "Sofía"
app.post('/api/gemini/chat', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'El servicio de IA no está configurado (falta GEMINI_API_KEY).',
      });
    }

    const { message, history, apprenticeProfile } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const systemInstruction = `
Eres "Sofia", la Tutora e Inteligencia Artificial Oficial de Inducción del SENA (Servicio Nacional de Aprendizaje - Colombia).
Tu labor es guiar, orientar y resolver dudas a los nuevos aprendices en su proceso de inducción institucional.

Manten un tono extremadamente amable, motivador, institucional, empático y claro (estilo colombiano educado y cercano, llamándolos "Aprendiz" o por su nombre si está disponible).

Información de contexto oficial actualizada sobre el SENA:
1. Misión SENA: Invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para el trabajo.
2. Símbolos: Escudo (3 ramas de la economía), Bandera (blanca con logo verde SENA), Logo-símbolo (aprendiz en camino ascendente), Himno del SENA.
3. Reglamento del Aprendiz VIGENTE: **Acuerdo 09 de 2024** (del 5 de noviembre de 2024, publicado en el Diario Oficial No. 52.947, modificado por el Acuerdo 02 de 2026). Deroga los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024.
   - Consta de 5 Capítulos y 53 Artículos:
     * Cap. I: Definiciones (Art. 1) y Principios Orientadores (Art. 3: Autonomía, Dignidad, Inclusión, Enfoque Diferencial, Desarrollo Sostenible, etc.).
     * Cap. II: Derechos del Aprendiz (Art. 5 - 24 numerales), Reconocimientos Formativos (Art. 6) y Representatividad (Art. 7).
     * Cap. III: Deberes del Aprendiz (Art. 8 - 24 numerales) y Prohibiciones (Art. 9 - 14 numerales).
     * Cap. IV: Ingreso, Novedades Académicas (Traslado, Aplazamiento, Reintegro, Retiro Voluntario, Deserción) y Evaluación de Aprendizaje (Art. 32-38: Evidencias, RAP Aprobado/No Aprobado).
     * Cap. V: Régimen de Faltas, Medidas Formativas (Art. 45-46: Llamado de atención y Plan de Mejoramiento), Medidas Sancionatorias (Art. 47: Condicionamiento y Cancelación de Matrícula), Comité de Evaluación (Art. 48) e Instancias Decisorias (Art. 49: 1ª Subdirección de Centro, 2ª Dirección Regional).
4. Ruta Formativa: Etapa Lectiva y Etapa Productiva (5 alternativas: Contrato de Aprendizaje, Vinculación Laboral, Proyecto Productivo, Pasantía, Monitoría).
5. Plataformas principales: SOFIA Plus y Zajuna LMS.
6. Bienestar al Aprendiz, SENNOVA e Investigación Aplicada, y Fondo Emprender.

Detalles del aprendiz actual:
${apprenticeProfile ? `Nombre: ${apprenticeProfile.nombre || 'Aprendiz'}, Programa: ${apprenticeProfile.programa || 'No especificado'}, Centro: ${apprenticeProfile.centro || 'SENA'}` : 'Aprendiz en proceso de inducción'}

Formatea tus respuestas usando Markdown limpio (listas con viñetas, negrillas para términos clave, respuestas concisas citando el Acuerdo 09 de 2024 cuando aplique).
`;

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      history.forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error('Error en API Gemini:', error);
    return res.status(500).json({
      error: 'Error procesando tu consulta con Sofía SENA Bot: ' + (error?.message || 'Error interno.'),
    });
  }
});

// Case Simulator AI Evaluator Endpoint
app.post('/api/gemini/evaluate-case', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: 'IA no configurada' });
    }

    const { scenarioTitle, scenarioDescription, apprenticeAction } = req.body;

    const prompt = `
En el contexto del Reglamento del Aprendiz SENA:
Caso: ${scenarioTitle}
Descripción del caso: ${scenarioDescription}
Respuesta/Acción propuesta por el Aprendiz: "${apprenticeAction}"

Evalúa si la acción del aprendiz es correcta o incorrecta según el Reglamento del Aprendiz SENA.
Responde en estricto formato JSON con esta estructura:
{
  "esCorrecto": true,
  "calificacion": "Excelente" | "Parcialmente Correcto" | "Incorrecto",
  "explicacion": "Explicación clara citando el Reglamento del Aprendiz SENA",
  "recomendacion": "Consejo o alternativa sugerida para el aprendiz"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);
    return res.json(parsed);
  } catch (error: any) {
    return res.status(500).json({ error: 'Error evaluando caso' });
  }
});

// In-memory store for apprentice responses (persist across requests during runtime)
interface StoredApprenticeResponse {
  id: string;
  fecha: string;
  nombre: string;
  tipoDocumento: string;
  documento: string;
  programa: string;
  ficha: string;
  centro: string;
  regional: string;
  email: string;
  progreso: number;
  estado: string;
  insigniasObtenidas: string;
}

const apprenticeResponsesStore: StoredApprenticeResponse[] = [
  {
    id: '1',
    fecha: '2026-10-07 10:15:22',
    nombre: 'Jonathan Mina',
    tipoDocumento: 'C.C.',
    documento: '1098765432',
    programa: 'Análisis y Desarrollo de Software (ADSO)',
    ficha: '2876543',
    centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    email: 'jonathan.mina@misena.edu.co',
    progreso: 100,
    estado: 'INDUCCIÓN COMPLETADA',
    insigniasObtenidas: '4/4 (Orgullo SENA, Ciudadano SENA, Navegador SOFIA, Aprendiz Innovador)'
  }
];

// Endpoint for apprentices to submit their induction results silently
app.post('/api/respuestas/submit', (req, res) => {
  try {
    const { 
      nombre, 
      tipoDocumento, 
      documento, 
      programa, 
      ficha, 
      centro, 
      regional, 
      email, 
      progreso, 
      estado, 
      insigniasObtenidas 
    } = req.body;

    if (!nombre || !documento || !ficha) {
      return res.status(400).json({ error: 'Nombre, documento y ficha son requeridos.' });
    }

    const newRecord: StoredApprenticeResponse = {
      id: String(Date.now()),
      fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      nombre,
      tipoDocumento: tipoDocumento || 'C.C.',
      documento,
      programa: programa || 'Formación SENA',
      ficha,
      centro: centro || 'Centro SENA',
      regional: regional || 'Regional SENA',
      email: email || '',
      progreso: Number(progreso) || 0,
      estado: estado || 'EN PROCESO',
      insigniasObtenidas: insigniasObtenidas || '0'
    };

    // Remove duplicates by document/ficha if updating
    const existingIndex = apprenticeResponsesStore.findIndex(r => r.documento === documento && r.ficha === ficha);
    if (existingIndex >= 0) {
      apprenticeResponsesStore[existingIndex] = newRecord;
    } else {
      apprenticeResponsesStore.unshift(newRecord);
    }

    return res.json({ success: true, message: 'Respuesta guardada con éxito', record: newRecord });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error guardando respuesta' });
  }
});

// Endpoint for Administrator to view all apprentice responses
app.get('/api/respuestas/admin', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SENA2026' && adminKey !== 'admin') {
    return res.status(401).json({ error: 'Acceso no autorizado para administradores.' });
  }
  return res.json({ responses: apprenticeResponsesStore });
});

async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor SENA Inducción corriendo en puerto ${PORT}`);
  });
}

setupServer();
