export interface ApprenticeRecordData {
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
  fechaRegistro?: string;
}

const SPREADSHEET_TITLE = 'Registro_Induccion_SENA_2026';

/**
 * Buscas si ya existe la hoja de cálculo de Inducción SENA en Google Drive del usuario.
 * Si no existe, la crea con los encabezados correspondientes.
 */
export async function findOrCreateInductionSpreadsheet(accessToken: string): Promise<string> {
  // 1. Buscar archivo existente en Drive
  const query = encodeURIComponent(`name='${SPREADSHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`);
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    const err = await searchRes.json();
    throw new Error(`Error buscando archivo en Drive: ${err?.error?.message || searchRes.statusText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // 2. Si no existe, crear la hoja de cálculo en Google Sheets
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const body = {
    properties: {
      title: SPREADSHEET_TITLE
    },
    sheets: [
      {
        properties: {
          title: 'Registro Aprendices SENA',
          gridProperties: {
            frozenRowCount: 1
          }
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Fecha y Hora' } },
                  { userEnteredValue: { stringValue: 'Nombre Aprendiz' } },
                  { userEnteredValue: { stringValue: 'Tipo Doc' } },
                  { userEnteredValue: { stringValue: 'Número Doc' } },
                  { userEnteredValue: { stringValue: 'Programa de Formación' } },
                  { userEnteredValue: { stringValue: 'Ficha' } },
                  { userEnteredValue: { stringValue: 'Centro de Formación' } },
                  { userEnteredValue: { stringValue: 'Regional' } },
                  { userEnteredValue: { stringValue: 'Correo Institucional' } },
                  { userEnteredValue: { stringValue: 'Progreso Inducción' } },
                  { userEnteredValue: { stringValue: 'Estado Inducción' } },
                  { userEnteredValue: { stringValue: 'Insignias Obtenidas' } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(`Error creando la Hoja de Cálculo: ${err?.error?.message || createRes.statusText}`);
  }

  const createData = await createRes.json();
  return createData.spreadsheetId;
}

/**
 * Agrega un nuevo registro de aprendiz a la hoja de cálculo en Google Drive.
 */
export async function appendApprenticeRecord(
  accessToken: string,
  spreadsheetId: string,
  record: ApprenticeRecordData
): Promise<void> {
  const now = record.fechaRegistro || new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  
  const values = [
    [
      now,
      record.nombre,
      record.tipoDocumento,
      record.documento,
      record.programa,
      record.ficha,
      record.centro,
      record.regional,
      record.email,
      `${record.progreso}%`,
      record.estado,
      record.insigniasObtenidas
    ]
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registro Aprendices SENA!A:L:append?valueInputOption=USER_ENTERED`;

  const appendRes = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values
    })
  });

  if (!appendRes.ok) {
    const err = await appendRes.json();
    throw new Error(`Error guardando datos en Google Sheets: ${err?.error?.message || appendRes.statusText}`);
  }
}

/**
 * Lee los registros actuales almacenados en la Hoja de Cálculo.
 */
export async function getSpreadsheetRecords(
  accessToken: string,
  spreadsheetId: string
): Promise<string[][]> {
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registro Aprendices SENA!A1:L100`;

  const readRes = await fetch(readUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!readRes.ok) {
    const err = await readRes.json();
    throw new Error(`Error al leer registros de Google Sheets: ${err?.error?.message || readRes.statusText}`);
  }

  const data = await readRes.json();
  return data.values || [];
}
