// src/pages/withdrawals/WithdrawalsPage.tsx
import { useState } from 'react';


interface Withdrawal {
  id: string;
  date: string;
  storeName: string;
  grossWeight: number;
  netWeight: number;
  status: 'draft' | 'pending' | 'completed';
  writeoffs?: WriteOff[];
}

interface WriteOff {
  id: string;
  reason: 'expired' | 'package_damaged' | 'perishable' | 'household';
  weight: number;
}

export const WithdrawalsPage = () => {
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'writeoffs'>('withdrawals');

  // Временные данные
  const withdrawals: Withdrawal[] = [
    {
      id: '1',
      date: '2026-09-07',
      storeName: 'Магазин №123',
      grossWeight: 150,
      netWeight: 145,
      status: 'completed',
      writeoffs: [
        { id: 'w1', reason: 'expired', weight: 3 },
        { id: 'w2', reason: 'package_damaged', weight: 2 },
      ],
    },
    {
      id: '2',
      date: '2026-09-06',
      storeName: 'Магазин №456',
      grossWeight: 200,
      netWeight: 190,
      status: 'pending',
    },
  ];

  const writeoffs: WriteOff[] = [
    { id: 'w1', reason: 'expired', weight: 3 },
    { id: 'w2', reason: 'package_damaged', weight: 2 },
    { id: 'w3', reason: 'perishable', weight: 5 },
  ];

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'Черновик',
      pending: 'Ожидает',
      completed: 'Завершена',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: '#8c8c8c',
      pending: '#faad14',
      completed: '#52c41a',
    };
    return colors[status as keyof typeof colors] || '#8c8c8c';
  };

  const getReasonLabel = (reason: string) => {
    const labels = {
      expired: 'Истек срок годности',
      package_damaged: 'Повреждена упаковка',
      perishable: 'Испорченный товар',
      household: 'Брак, хоз. нужды',
    };
    return labels[reason as keyof typeof labels] || reason;
  };

  return (
    <div className="page-withdrawals">
      <h1>📦 Выемки из боксов</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Управление выемками из магазинов и списаниями
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e8e8e8' }}>
        <button
          onClick={() => setActiveTab('withdrawals')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'withdrawals' ? 600 : 400,
            color: activeTab === 'withdrawals' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'withdrawals' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          📋 Выемки
        </button>
        <button
          onClick={() => setActiveTab('writeoffs')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'writeoffs' ? 600 : 400,
            color: activeTab === 'writeoffs' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'writeoffs' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          🗑️ Списания
        </button>
      </div>

      {/* Tab Content: Выемки */}
      {activeTab === 'withdrawals' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>Список выемок</h2>
            <button
              style={{
                padding: '8px 16px',
                background: '#1677ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              + Новая выемка
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Дата</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Магазин</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Вес брутто</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Вес нетто</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Списания</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 12 }}>#{item.id}</td>
                  <td style={{ padding: 12 }}>{item.date}</td>
                  <td style={{ padding: 12 }}>{item.storeName}</td>
                  <td style={{ padding: 12 }}>{item.grossWeight} кг</td>
                  <td style={{ padding: 12 }}>{item.netWeight} кг</td>
                  <td style={{ padding: 12 }}>
                    {item.writeoffs && item.writeoffs.length > 0 ? (
                      <span style={{ color: '#ff4d4f' }}>
                        {item.writeoffs.length} списаний
                      </span>
                    ) : (
                      <span style={{ color: '#8c8c8c' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: 12 }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 12,
                        background: getStatusColor(item.status) + '20',
                        color: getStatusColor(item.status),
                      }}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Tab Content: Списания */}
      {activeTab === 'writeoffs' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>Список списаний</h2>
            <button
              style={{
                padding: '8px 16px',
                background: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              + Новое списание
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Причина</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Вес</th>
              </tr>
            </thead>
            <tbody>
              {writeoffs.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 12 }}>#{item.id}</td>
                  <td style={{ padding: 12 }}>{getReasonLabel(item.reason)}</td>
                  <td style={{ padding: 12 }}>{item.weight} кг</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16, padding: 16, background: '#fffbe6', borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#d48806' }}>
              💡 Списание — отдельный процесс, вычитается из выемки. 
              Воду не списываем.
            </p>
          </div>
        </>
      )}
    </div>
  );
};