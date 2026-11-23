import {notFound} from 'next/navigation';
// Requests are normally handled by the Next.js beforeFiles CRM reverse-proxy.
// Fail closed rather than redirecting to the retired ChatGPT Sites CRM.
export default function CRMRouteFallback(){notFound();}
