// src/pages/campaigns/CampaignsPage.tsx
import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  city: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  responsible: string;
  type: 'individual' | 'federal';
}

export const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'federal'>('individual');

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Сбор продуктов для многодетных семей',
      city: 'Москва',
      date: '2026-09-15',
      status: 'pending',
      responsible: 'Иванова М.',
      type: 'individual',
    },
    {
      id: '2',
      name: 'Помощь пожилым людям',
      city: 'Санкт-Петербург',
      date: '2026-09-10',
      status: 'approved',
      responsible: 'Петров А.',
      type: 'individual',
    },
    {
      id: '3',
      name: 'Федеральная кампания "Добрый урожай"',
      city: 'Москва',
      date: '2026-09-20',
      status: 'pending',
      responsible: 'Сидорова Е.',
      type: 'federal',
    },
  ];

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'На рассмотрении',
      approved: 'Согласовано',
      rejected: 'Отказано',
      completed: 'Завершено',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#faad14',
      approved: '#52c41a',
      rejected: '#ff4d4f',
      completed: '#1890ff',
    };
    return colors[status] || '#8c8c8c';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      individual: 'Индивидуальная',
      federal: 'Федеральная',
    };
    return labels[type] || type;
  };

  const filteredCampaigns = campaigns.filter((c) => c.type === activeTab);

  return (
    <div className="page-campaigns">
      <h1>🎯 Благотворительные кампании</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Управление кампаниями и мероприятиями фонда
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e8e8e8' }}>
        <button
          onClick={() => setActiveTab('individual')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'individual' ? 600 : 400,
            color: activeTab === 'individual' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'individual' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          🏠 Индивидуальные
        </button>
        <button
          onClick={() => setActiveTab('federal')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeTab === 'federal' ? 600 : 400,
            color: activeTab === 'federal' ? '#1677ff' : '#666',
            borderBottom: activeTab === 'federal' ? '3px solid #1677ff' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          🇷🇺 Федеральные
        </button>
      </div>

      {/* Информационный блок */}
      <div style={{ marginBottom: 16, padding: 16, background: '#e6f7ff', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#1677ff' }}>
          {activeTab === 'individual'
            ? '📌 Индивидуальные кампании: инициатор — куратор или НКО. Жёсткая форма: ответственный, дата, время, город → адрес → номер авто, волонтёры: ФИО + ДР. Минимум 5 дней до кампании.'
            : '📌 Федеральные кампании: организуются совместно с партнёрами и НКО. Приоритет у кураторов.'
          }
        </p>
      </div>

      {/* Кнопка создания */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              padding: '6px 16px',
              background: '#1677ff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Все
          </button>
          <button
            style={{
              padding: '6px 16px',
              background: 'transparent',
              color: '#666',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            На рассмотрении
          </button>
          <button
            style={{
              padding: '6px 16px',
              background: 'transparent',
              color: '#666',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Согласовано
          </button>
        </div>

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
          + Создать кампанию
        </button>
      </div>

      {/* Таблица */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Название</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Город</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Дата</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Ответственный</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Тип</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: 12 }}>#{item.id}</td>
                <td style={{ padding: 12 }}>{item.name}</td>
                <td style={{ padding: 12 }}>{item.city}</td>
                <td style={{ padding: 12 }}>{item.date}</td>
                <td style={{ padding: 12 }}>{item.responsible}</td>
                <td style={{ padding: 12 }}>
                  <span
                    style={{
                      padding: '2px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      background: item.type === 'federal' ? '#e6f7ff' : '#f6ffed',
                      color: item.type === 'federal' ? '#1677ff' : '#52c41a',
                    }}
                  >
                    {getTypeLabel(item.type)}
                  </span>
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
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#999' }}>
                Нет кампаний этого типа
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};