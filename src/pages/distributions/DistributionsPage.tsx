// src/pages/distributions/DistributionsPage.tsx
import { useState } from 'react';

interface Distribution {
  id: string;
  date: string;
  curatorName: string;
  beneficiaryCount: number;
  totalWeight: number;
  status: 'planned' | 'in_progress' | 'completed';
}

export const DistributionsPage = () => {
  const [activeTab, setActiveTab] = useState<'packaging' | 'distribution'>('packaging');

  const distributions: Distribution[] = [
    {
      id: '1',
      date: '2026-09-07',
      curatorName: 'Иванова М.',
      beneficiaryCount: 25,
      totalWeight: 120,
      status: 'completed',
    },
    {
      id: '2',
      date: '2026-09-08',
      curatorName: 'Петров А.',
      beneficiaryCount: 30,
      totalWeight: 150,
      status: 'in_progress',
    },
  ];

  const getStatusLabel = (status: string) => {
    const labels = {
      planned: 'Запланирована',
      in_progress: 'В процессе',
      completed: 'Завершена',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planned: '#1890ff',
      in_progress: '#faad14',
      completed: '#52c41a',
    };
    return colors[status as keyof typeof colors] || '#8c8c8c';
  };

  return (
    <div className="page-distributions">
      <h1>📤 Раздачи благополучателям</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Формирование наборов и раздача благополучателям
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e8e8e8' }}>
        <button
          onClick={() => setActiveTab('packaging')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'packaging' ? 600 : 400,
            color: activeTab === 'packaging' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'packaging' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          📦 Фасовка наборов
        </button>
        <button
          onClick={() => setActiveTab('distribution')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'distribution' ? 600 : 400,
            color: activeTab === 'distribution' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'distribution' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          🤝 Раздача
        </button>
      </div>

      {/* Tab Content: Фасовка */}
      {activeTab === 'packaging' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>Формирование наборов</h2>
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
              + Сформировать набор
            </button>
          </div>

          <div style={{ padding: 16, background: '#f6ffed', borderRadius: 8 }}>
            <p style={{ margin: 0, color: '#389e0d' }}>
              ✅ Правила фасовки: 4–7 кг на набор. 600 кг ≈ 100 наборов.
              Предупреждение: 3–13 кг.
            </p>
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ padding: 16, background: '#fafafa', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>📦</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>45</div>
              <div style={{ color: '#666' }}>Всего наборов</div>
            </div>
            <div style={{ padding: 16, background: '#fafafa', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>⚖️</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>5.2 кг</div>
              <div style={{ color: '#666' }}>Средний вес</div>
            </div>
            <div style={{ padding: 16, background: '#fafafa', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>👥</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>12</div>
              <div style={{ color: '#666' }}>Кураторов</div>
            </div>
          </div>
        </>
      )}

      {/* Tab Content: Раздача */}
      {activeTab === 'distribution' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>Список раздач</h2>
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
              + Новая раздача
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Дата</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Куратор</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Кол-во</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Вес</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {distributions.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 12 }}>#{item.id}</td>
                  <td style={{ padding: 12 }}>{item.date}</td>
                  <td style={{ padding: 12 }}>{item.curatorName}</td>
                  <td style={{ padding: 12 }}>{item.beneficiaryCount} чел</td>
                  <td style={{ padding: 12 }}>{item.totalWeight} кг</td>
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
    </div>
  );
};