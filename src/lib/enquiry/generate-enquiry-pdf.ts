import path from 'node:path';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import {
  ENQUIRY_PDF_FOOTER,
  ENQUIRY_PDF_TITLE,
  ENQUIRY_SITE_URL,
} from '@/lib/enquiry/constants';
import { formatSubmissionDateTime } from '@/lib/enquiry/format-submission-datetime';
import type { EnquiryRecord } from '@/lib/enquiry/types';

type PdfDoc = InstanceType<typeof PDFDocument>;

const PAGE_MARGIN = 40;
const BOTTOM_MARGIN = 36;
const LABEL_WIDTH = 118;
const ROW_PADDING_X = 12;
const ROW_MIN_HEIGHT = 16;
const SECTION_GAP = 8;
const SECTION_HEADER_HEIGHT = 18;
const BASE_ROW_FONT_SIZE = 8.5;
const BASE_COMPACT_FONT_SIZE = 7;
const BASE_SECTION_TITLE_SIZE = 8.5;
const ROW_BORDER = '#dddddd';
const LABEL_COLOR = '#444444';
const ROW_ALT_BG = '#f7f9fc';
const BRAND_BLUE = '#1c62af';
const FOOTER_COLOR = '#888888';
const LOGO_WIDTH = 110;
const LOGO_HEIGHT = 18;
const LOGO_RENDER_SCALE = 4;
const LOGO_RASTER_DPI = 300;

interface PdfRow {
  label: string;
  value: string;
  compact?: boolean;
}

interface PdfSection {
  title: string;
  rows: PdfRow[];
}

interface PdfLayout {
  rowFontSize: number;
  compactFontSize: number;
  sectionTitleSize: number;
  rowPaddingY: number;
}

const DEFAULT_LAYOUT: PdfLayout = {
  rowFontSize: BASE_ROW_FONT_SIZE,
  compactFontSize: BASE_COMPACT_FONT_SIZE,
  sectionTitleSize: BASE_SECTION_TITLE_SIZE,
  rowPaddingY: 4,
};

async function loadLogoBuffer(): Promise<Buffer | null> {
  const svgPath = path.join(
    process.cwd(),
    'public',
    'assets',
    'utility-choice-logo.svg',
  );

  try {
    return await sharp(svgPath, { density: LOGO_RASTER_DPI })
      .resize({
        width: Math.round(LOGO_WIDTH * LOGO_RENDER_SCALE),
        height: Math.round(LOGO_HEIGHT * LOGO_RENDER_SCALE),
        fit: 'inside',
        kernel: sharp.kernel.lanczos3,
      })
      .png({ compressionLevel: 6 })
      .toBuffer();
  } catch {
    return null;
  }
}

function formatCoordinates(latitude: string, longitude: string): string {
  if (latitude === 'N/A' || longitude === 'N/A') {
    return 'N/A';
  }

  const lat = Number(latitude);
  const lng = Number(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return `${latitude}, ${longitude}`;
  }

  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

function formatLocationSummary(record: EnquiryRecord): string {
  const parts = [record.city, record.region, record.country]
    .map((part) => part?.trim())
    .filter((part) => part && part !== 'Unknown');

  return parts.length > 0 ? parts.join(', ') : 'Unknown';
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}

function buildPdfSections(record: EnquiryRecord): PdfSection[] {
  const submittedAt = formatSubmissionDateTime(
    record.submittedAt,
    record.submissionTimeZone,
  );

  const sections: PdfSection[] = [
    {
      title: 'Contact Information',
      rows: [
        { label: 'Full Name', value: record.fullName },
        { label: 'Email', value: record.email },
        { label: 'Phone', value: record.contactNumber },
        { label: 'Address', value: record.currentAddress },
      ],
    },
    {
      title: 'Enquiry Details',
      rows: [
        { label: 'Lead ID', value: record.leadId },
        {
          label: 'Services',
          value:
            record.serviceLabels.length > 0
              ? record.serviceLabels.join(', ')
              : 'None selected',
        },
        { label: 'Submitted', value: submittedAt },
      ],
    },
    {
      title: 'Location',
      rows: [
        { label: 'Summary', value: formatLocationSummary(record) },
        ...(record.detectedAddress
          ? [{ label: 'Detected Address', value: record.detectedAddress }]
          : []),
        { label: 'Country', value: record.country },
        { label: 'Region', value: record.region },
        { label: 'City', value: record.city },
        {
          label: 'Coordinates',
          value: formatCoordinates(record.latitude, record.longitude),
        },
      ],
    },
    {
      title: 'Device & Network',
      rows: [
        { label: 'IP Address', value: record.ipAddress },
        { label: 'Browser', value: record.browser },
        { label: 'Operating System', value: record.operatingSystem },
        {
          label: 'User Agent',
          value: truncateText(record.userAgent, 120),
          compact: true,
        },
      ],
    },
    {
      title: 'Consent',
      rows: [{ label: 'Acknowledgement', value: record.consentText, compact: true }],
    },
  ];

  return sections;
}

function getContentBottom(doc: PdfDoc): number {
  return doc.page.height - doc.page.margins.bottom;
}

function getValueFontSize(row: PdfRow, layout: PdfLayout): number {
  return row.compact ? layout.compactFontSize : layout.rowFontSize;
}

function measureRowHeight(
  doc: PdfDoc,
  row: PdfRow,
  contentWidth: number,
  layout: PdfLayout,
): number {
  const valueWidth = contentWidth - LABEL_WIDTH - ROW_PADDING_X * 2;
  const valueFontSize = getValueFontSize(row, layout);
  const label = `${row.label}:`;

  doc.font('Helvetica').fontSize(layout.rowFontSize);
  const labelHeight = doc.heightOfString(label, { width: LABEL_WIDTH });
  doc.font(row.compact ? 'Helvetica-Oblique' : 'Helvetica').fontSize(valueFontSize);
  const valueHeight = doc.heightOfString(row.value, {
    width: valueWidth,
    lineGap: 0,
  });

  return (
    Math.max(ROW_MIN_HEIGHT, labelHeight, valueHeight) + layout.rowPaddingY * 2
  );
}

function measureSectionHeight(
  doc: PdfDoc,
  section: PdfSection,
  contentWidth: number,
  layout: PdfLayout,
): number {
  const rowsHeight = section.rows.reduce(
    (total, row) => total + measureRowHeight(doc, row, contentWidth, layout),
    0,
  );

  return SECTION_HEADER_HEIGHT + rowsHeight + 2;
}

function measureSectionsHeight(
  doc: PdfDoc,
  sections: PdfSection[],
  contentWidth: number,
  layout: PdfLayout,
): number {
  return sections.reduce(
    (total, section, index) =>
      total +
      measureSectionHeight(doc, section, contentWidth, layout) +
      (index < sections.length - 1 ? SECTION_GAP : 0),
    0,
  );
}

function resolveLayout(
  doc: PdfDoc,
  sections: PdfSection[],
  contentWidth: number,
  availableHeight: number,
): PdfLayout {
  let layout = { ...DEFAULT_LAYOUT };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const totalHeight = measureSectionsHeight(doc, sections, contentWidth, layout);
    if (totalHeight <= availableHeight) {
      return layout;
    }

    layout = {
      rowFontSize: Math.max(6.5, layout.rowFontSize - 0.5),
      compactFontSize: Math.max(5.8, layout.compactFontSize - 0.4),
      sectionTitleSize: Math.max(7.5, layout.sectionTitleSize - 0.5),
      rowPaddingY: Math.max(2, layout.rowPaddingY - 1),
    };
  }

  return layout;
}

function drawTextAt(
  doc: PdfDoc,
  text: string,
  x: number,
  y: number,
  options: PDFKit.Mixins.TextOptions,
): void {
  doc.text(text, x, y, { lineBreak: false, ...options });
}

function drawSectionHeader(
  doc: PdfDoc,
  y: number,
  title: string,
  contentWidth: number,
  layout: PdfLayout,
): number {
  doc.save();
  doc.rect(PAGE_MARGIN, y, contentWidth, SECTION_HEADER_HEIGHT).fill(BRAND_BLUE);
  doc.restore();

  doc.fillColor('#ffffff');
  doc.font('Helvetica-Bold').fontSize(layout.sectionTitleSize);
  drawTextAt(doc, title.toUpperCase(), PAGE_MARGIN + ROW_PADDING_X, y + 5, {
    width: contentWidth - ROW_PADDING_X * 2,
    align: 'left',
  });

  return y + SECTION_HEADER_HEIGHT;
}

function drawSectionRow(
  doc: PdfDoc,
  y: number,
  row: PdfRow,
  contentWidth: number,
  alt: boolean,
  layout: PdfLayout,
): number {
  const rowHeight = measureRowHeight(doc, row, contentWidth, layout);
  const valueWidth = contentWidth - LABEL_WIDTH - ROW_PADDING_X * 2;
  const valueX = PAGE_MARGIN + LABEL_WIDTH + ROW_PADDING_X;
  const valueFontSize = getValueFontSize(row, layout);
  const textY = y + layout.rowPaddingY;
  const label = `${row.label}:`;

  if (alt) {
    doc.save();
    doc.rect(PAGE_MARGIN, y, contentWidth, rowHeight).fill(ROW_ALT_BG);
    doc.restore();
  }

  doc.save();
  doc.strokeColor(ROW_BORDER).lineWidth(0.5);
  doc
    .moveTo(PAGE_MARGIN, y + rowHeight)
    .lineTo(PAGE_MARGIN + contentWidth, y + rowHeight)
    .stroke();
  doc.restore();

  doc.fillColor(LABEL_COLOR);
  doc.font('Helvetica').fontSize(layout.rowFontSize);
  doc.text(label, PAGE_MARGIN + ROW_PADDING_X, textY, {
    width: LABEL_WIDTH,
    height: rowHeight - layout.rowPaddingY * 2,
    align: 'left',
    lineBreak: true,
  });

  doc.fillColor('#000000');
  doc.font(row.compact ? 'Helvetica-Oblique' : 'Helvetica').fontSize(valueFontSize);
  doc.text(row.value, valueX, textY, {
    width: valueWidth,
    height: rowHeight - layout.rowPaddingY * 2,
    align: 'left',
    lineBreak: true,
    lineGap: 0,
  });

  return y + rowHeight;
}

function drawSection(
  doc: PdfDoc,
  y: number,
  section: PdfSection,
  contentWidth: number,
  layout: PdfLayout,
): number {
  const sectionTop = y;
  y = drawSectionHeader(doc, y, section.title, contentWidth, layout);

  section.rows.forEach((row, index) => {
    y = drawSectionRow(doc, y, row, contentWidth, index % 2 === 1, layout);
  });

  doc.save();
  doc.strokeColor(ROW_BORDER).lineWidth(0.75);
  doc.rect(PAGE_MARGIN, sectionTop, contentWidth, y - sectionTop).stroke();
  doc.restore();

  return y;
}

function drawHeader(
  doc: PdfDoc,
  contentWidth: number,
  submittedAt: string,
  logoBuffer: Buffer | null,
): number {
  const headerRightWidth = 170;
  const headerRightX = PAGE_MARGIN + contentWidth - headerRightWidth;
  const headerTop = PAGE_MARGIN;

  if (logoBuffer) {
    doc.image(logoBuffer, PAGE_MARGIN, headerTop, {
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    });
  } else {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(BRAND_BLUE);
    drawTextAt(doc, 'Utility Choice', PAGE_MARGIN, headerTop + 2, {
      width: LOGO_WIDTH,
    });
  }

  doc.font('Helvetica').fontSize(8).fillColor('#000000');
  drawTextAt(doc, submittedAt, headerRightX, headerTop, {
    width: headerRightWidth,
    align: 'right',
  });

  doc.fillColor(BRAND_BLUE);
  drawTextAt(doc, ENQUIRY_SITE_URL, headerRightX, headerTop + 11, {
    width: headerRightWidth,
    align: 'right',
    link: ENQUIRY_SITE_URL,
    underline: true,
  });

  return headerTop + 30;
}

function drawFooter(doc: PdfDoc): void {
  const contentWidth = doc.page.width - PAGE_MARGIN * 2;
  const footerY = getContentBottom(doc) - 12;

  doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(FOOTER_COLOR);
  drawTextAt(doc, ENQUIRY_PDF_FOOTER, PAGE_MARGIN, footerY, {
    width: contentWidth,
    align: 'left',
  });
  drawTextAt(doc, 'Page 1/1', PAGE_MARGIN, footerY, {
    width: contentWidth,
    align: 'center',
  });
}

export function getEnquiryPdfFilename(leadId: string): string {
  return `utility-choice-enquiry-${leadId}.pdf`;
}

export async function generateEnquiryPdf(
  record: EnquiryRecord,
): Promise<Buffer> {
  const logoBuffer = await loadLogoBuffer();
  const submittedAt = formatSubmissionDateTime(
    record.submittedAt,
    record.submissionTimeZone,
  );

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: PAGE_MARGIN,
        bottom: BOTTOM_MARGIN,
        left: PAGE_MARGIN,
        right: PAGE_MARGIN,
      },
      autoFirstPage: true,
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.on('pageAdded', () => {
      reject(new Error('Enquiry PDF must fit on a single page'));
    });

    const contentWidth = doc.page.width - PAGE_MARGIN * 2;
    const footerReserve = 18;

    let y = drawHeader(doc, contentWidth, submittedAt, logoBuffer);

    doc.fillColor(BRAND_BLUE);
    doc.font('Helvetica-Bold').fontSize(13);
    drawTextAt(doc, ENQUIRY_PDF_TITLE, PAGE_MARGIN, y, {
      width: contentWidth,
      align: 'center',
    });

    y += 20;

    const sections = buildPdfSections(record);
    const layout = resolveLayout(
      doc,
      sections,
      contentWidth,
      getContentBottom(doc) - footerReserve - y,
    );

    sections.forEach((section, index) => {
      y = drawSection(doc, y, section, contentWidth, layout);
      if (index < sections.length - 1) {
        y += SECTION_GAP;
      }
    });

    drawFooter(doc);
    doc.end();
  });
}
