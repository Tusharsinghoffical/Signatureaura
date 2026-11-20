import { getRealtimeHub, type RealtimeHubPayload } from '@/lib/realtime-hub';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const hub = getRealtimeHub();
  const encoder = new TextEncoder();

  let cleanup: (() => void) | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (payload: RealtimeHubPayload) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          // Stream closed
        }
      };

      // Push initial genuine snapshot immediately on connect
      sendEvent({
        type: 'init',
        ...hub.getSnapshot(),
        timestamp: new Date().toISOString(),
      });

      const onEvent = (payload: RealtimeHubPayload) => {
        sendEvent(payload);
      };

      hub.emitter.on('event', onEvent);

      const keepaliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: keepalive ${Date.now()}\n\n`));
        } catch {
          clearInterval(keepaliveInterval);
        }
      }, 20000);

      cleanup = () => {
        clearInterval(keepaliveInterval);
        hub.emitter.off('event', onEvent);
      };
    },
    cancel() {
      if (cleanup) cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
