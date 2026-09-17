import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

interface QrCodeScannerProps {
  onScanSuccess: (text: string) => void;
}

export const QrCodeScanner = ({ onScanSuccess }: QrCodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
     console.error(e)
    }
  };

  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  };

  const startScanner = async () => {
    if (!videoRef.current) return;

    try {
      setError(null);
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('🔍 result:', result);
    console.log('🔍 result.data:', result.data);
    console.log('🔍 typeof result.data:', typeof result.data);
          playBeep();
          vibrate();
          onScanSuccess(result.data);
          stopScanner();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 5,
        }
      );

      await scanner.start();
      scannerRef.current = scanner;
      setIsScanning(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить доступ к камере');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => stopScanner();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
      {error && (
        <div
          style={{
            padding: 12,
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: 8,
            marginBottom: 16,
            color: '#cf1322',
            fontSize: 14,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Видео с камерой */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1',
          background: '#000',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Рамка для наведения */}
        {isScanning && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height: '70%',
              border: '3px solid #1677ff',
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Анимированная линия сканирования */}
        {isScanning && (
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              right: '15%',
              height: 2,
              background: '#1677ff',
              boxShadow: '0 0 10px #1677ff',
              animation: 'scan 2s linear infinite',
            }}
          />
        )}
      </div>

      {/* Кнопка */}
      <button
        onClick={isScanning ? stopScanner : startScanner}
        style={{
          width: '100%',
          marginTop: 16,
          padding: '14px 24px',
          background: isScanning ? '#ff4d4f' : '#1677ff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {isScanning ? '⏹ Остановить' : '📷 Включить камеру'}
      </button>

      {/* Анимация линии */}
      <style>{`
        @keyframes scan {
          0% { top: 15%; }
          50% { top: 85%; }
          100% { top: 15%; }
        }
      `}</style>
    </div>
  );
};