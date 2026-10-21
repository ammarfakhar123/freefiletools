import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 180; // High traffic allowance: 180 req/min per IP
const MAX_MAP_SIZE = 10000;

// Periodic cleanup of expired rate limit entries every 2 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, ip) => {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  });
}, 2 * 60 * 1000);

// Attack patterns and malicious exploit paths
const MALICIOUS_PATH_PATTERNS = [
  /\/\.env/i,
  /\/\.git/i,
  /\/\.aws/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/etc\/passwd/i,
  /\.\.\//, // Path traversal
  /\/eval\(/i,
  /<script/i,
  /\.php$/i,
  /\.asp$/i,
  /\.jsp$/i,
  /\/cgi-bin/i,
];

// Known exploit and aggressive scanner user-agents
const MALICIOUS_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /masscan/i,
  /wpscan/i,
  /zgrab/i,
  /gobuster/i,
  /dirbuster/i,
  /nmap/i,
  /havij/i,
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bypass static Next.js assets to maintain 100% speed
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/brand/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/pdf.worker.min.js'
  ) {
    return NextResponse.next();
  }

  // 1. Anti-Hacking: Block Exploit Probes & Vulnerability Scanners
  for (const pattern of MALICIOUS_PATH_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(request.nextUrl.search)) {
      return new NextResponse(
        'Access Denied: Malicious exploit attempt blocked by FreeFileTools Security Firewall.',
        {
          status: 403,
          headers: {
            'Content-Type': 'text/plain',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
          },
        }
      );
    }
  }

  // 2. Block Malicious Scanner User-Agents
  const userAgent = request.headers.get('user-agent') || '';
  for (const pattern of MALICIOUS_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      return new NextResponse(
        'Access Denied: Automated vulnerability scanner detected.',
        {
          status: 403,
          headers: {
            'Content-Type': 'text/plain',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
          },
        }
      );
    }
  }

  // 3. High-Traffic Anti-DDoS Rate Limiting
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const now = Date.now();
  let record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetTime) {
    // If map grows too large under heavy traffic attack, prevent memory exhaustion
    if (rateLimitMap.size > MAX_MAP_SIZE) {
      rateLimitMap.clear();
    }
    record = { count: 1, resetTime: now + WINDOW_MS };
    rateLimitMap.set(clientIp, record);
  } else {
    record.count++;
  }

  if (record.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return new NextResponse(
      'Too Many Requests: Rate limit exceeded to ensure high performance for all users. Please retry in a few moments.',
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.max(1, retryAfter)),
          'Content-Type': 'text/plain',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  }

  // 4. Inject Enhanced Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
