import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { m3uSources } from '../data/mock';
import type { M3USource } from '../types';
import { ChevronLeftIcon, PlusCircleIcon, RefreshIcon, EditIcon, TrashIcon, UploadIcon, LinkIcon, XIcon, CheckIcon } from '../components/Icons';

export function M3UManagerScreen() {
  const { goBack } = useApp();
  const [sources, setSources] = useState<M3USource[]>(m3uSources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [addMode, setAddMode] = useState<'url' | 'file'>('url');

  const statusColor: Record<M3USource['status'], string> = {
    active: 'var(--color-green)',
    error: 'var(--color-red-live)',
    updating: 'var(--color-gold)',
    disabled: 'var(--color-text-subtle)',
  };
  const statusLabel: Record<M3USource['status'], string> = {
    active: 'Active',
    error: 'Error',
    updating: 'Updating…',
    disabled: 'Disabled',
  };

  const toggleSource = (id: string) =>
    setSources(s => s.map(src => src.id === id ? { ...src, enabled: !src.enabled, status: !src.enabled ? 'active' : 'disabled' } : src));

  const deleteSource = (id: string) =>
    setSources(s => s.filter(src => src.id !== id));

  const refreshSource = (id: string) =>
    setSources(s => s.map(src => src.id === id ? { ...src, status: 'updating' as const } : src));

  const addSource = () => {
    if (!newName || !newUrl) return;
    setSources(s => [...s, {
      id: `src${Date.now()}`,
      name: newName,
      url: newUrl,
      lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'active',
      itemCount: 0,
      enabled: true,
    }]);
    setNewName('');
    setNewUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      <div className="px-4 md:px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}>
            <ChevronLeftIcon size={18} />
          </button>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            Content Sources
          </h1>
        </div>
        <p className="text-sm ml-13 pl-13" style={{ color: 'var(--color-text-muted)' }}>
          Manage your M3U playlists and IPTV sources
        </p>
      </div>

      {/* Summary */}
      <div className="px-4 md:px-12 grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Active', value: sources.filter(s => s.status === 'active').length, color: 'var(--color-green)' },
          { label: 'Total Items', value: sources.filter(s => s.enabled).reduce((a, s) => a + s.itemCount, 0).toLocaleString(), color: 'var(--color-primary-light)' },
          { label: 'Sources', value: sources.length, color: 'var(--color-gold)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-2xl text-center" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-subtle)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Source list */}
      <div className="px-4 md:px-12 space-y-3 mb-6">
        {sources.map(src => (
          <div
            key={src.id}
            className="p-4 rounded-2xl transition-all"
            style={{
              background: 'var(--color-surface-2)',
              border: `1px solid ${src.status === 'error' ? 'rgba(239,68,68,0.25)' : 'var(--color-border)'}`,
              opacity: src.enabled ? 1 : 0.6,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{src.name}</p>
                  <div
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: `${statusColor[src.status]}18`, color: statusColor[src.status] }}
                  >
                    {statusLabel[src.status]}
                  </div>
                </div>

                {/* URL (truncated) */}
                <p className="text-xs font-mono truncate mb-2" style={{ color: 'var(--color-text-subtle)', maxWidth: 300 }}>
                  {src.url.length > 45 ? `${src.url.slice(0, 45)}…` : src.url}
                </p>

                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                  {src.itemCount > 0 && (
                    <span>{src.itemCount.toLocaleString()} items</span>
                  )}
                  <span>Updated {src.lastUpdated}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => refreshSource(src.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}
                  title="Refresh"
                >
                  <RefreshIcon size={14} />
                </button>
                <button
                  onClick={() => deleteSource(src.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--color-red-live)' }}
                  title="Delete"
                >
                  <TrashIcon size={14} />
                </button>
                {/* Enable/disable toggle */}
                <button
                  onClick={() => toggleSource(src.id)}
                  className="w-10 h-6 rounded-full relative transition-colors"
                  style={{ background: src.enabled ? 'var(--color-primary)' : 'var(--color-surface-4)' }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: src.enabled ? '1.5rem' : '0.25rem' }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="px-4 md:px-12">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all"
          style={{
            border: '2px dashed var(--color-border-strong)',
            color: 'var(--color-primary-light)',
            background: 'var(--color-primary-muted)',
          }}
        >
          <PlusCircleIcon size={18} />
          Add New Source
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 fade-in"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Add Source</h2>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--color-text-muted)' }}>
                <XIcon size={20} />
              </button>
            </div>

            {/* Tab selector */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'var(--color-surface-2)' }}>
              {[{ key: 'url', label: '🔗 URL', Icon: LinkIcon }, { key: 'file', label: '📂 Local File', Icon: UploadIcon }].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setAddMode(key as 'url' | 'file')}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: addMode === key ? 'var(--color-primary)' : 'transparent',
                    color: addMode === key ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--color-text-subtle)' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="My IPTV Provider"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              {addMode === 'url' ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--color-text-subtle)' }}>
                    M3U URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="http://provider.example.com/list.m3u"
                    className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer"
                  style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
                >
                  <UploadIcon size={32} />
                  <p className="text-sm font-medium">Tap to select an M3U file</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>Supports .m3u and .m3u8 formats</p>
                </div>
              )}

              <button
                onClick={addSource}
                disabled={!newName || (!newUrl && addMode === 'url')}
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                style={{ background: 'var(--color-primary)', color: 'white' }}
              >
                <CheckIcon size={16} />
                Add Source
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
