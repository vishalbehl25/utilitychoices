export interface ParsedUserAgent {
  browser: string;
  operatingSystem: string;
}

export function parseUserAgent(userAgent: string): ParsedUserAgent {
  const ua = userAgent.trim() || 'Unknown';

  let operatingSystem = 'Unknown';
  if (/Windows NT 10/i.test(ua)) operatingSystem = 'Windows 10';
  else if (/Windows NT 11/i.test(ua)) operatingSystem = 'Windows 11';
  else if (/Windows/i.test(ua)) operatingSystem = 'Windows';
  else if (/Mac OS X ([\d_]+)/i.test(ua)) {
    operatingSystem = `macOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/Android ([\d.]+)/i.test(ua)) operatingSystem = `Android ${RegExp.$1}`;
  else if (/iPhone OS ([\d_]+)/i.test(ua)) {
    operatingSystem = `iOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/iPad.*OS ([\d_]+)/i.test(ua)) {
    operatingSystem = `iPadOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/Linux/i.test(ua)) operatingSystem = 'Linux';

  let browser = 'Unknown';
  if (/Edg\/([\d.]+)/i.test(ua)) browser = `Edge ${RegExp.$1}`;
  else if (/OPR\/([\d.]+)/i.test(ua)) browser = `Opera ${RegExp.$1}`;
  else if (/Chrome\/([\d.]+)/i.test(ua)) browser = `Chrome ${RegExp.$1}`;
  else if (/Version\/([\d.]+).*Safari/i.test(ua)) browser = `Safari ${RegExp.$1}`;
  else if (/Firefox\/([\d.]+)/i.test(ua)) browser = `Firefox ${RegExp.$1}`;

  return { browser, operatingSystem };
}
