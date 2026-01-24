
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Users,
    Layout,
    Eye,
    Mic2,
    Lock,
    Unlock,
    AlertCircle,
    Play,
    TrendingUp,
    Activity,
    LogOut,
    Clock,
    MapPin,
    X,
    ExternalLink
} from 'lucide-react';
import { useStore, Visit, VoiceMessage, ShowcaseItem, Resource, MusicItem } from '../lib/store';
import { Upload, Trash2, ArrowUp, ArrowDown, Plus, HardDrive, Info, Music } from 'lucide-react';

interface AdminDashboardProps {
    onClose?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'comms' | 'showcase' | 'resources' | 'music'>('overview');
    const [loginError, setLoginError] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        visits: [] as Visit[],
        messages: [] as VoiceMessage[],
        frozenIps: [] as string[],
        showcaseItems: [] as ShowcaseItem[],
        resources: [] as Resource[],
        music: [] as MusicItem[],
    });

    // Store data
    const { visits, messages, frozenIps, freezeIp, unfreezeIp, showcaseItems, resources, music, toggleVisitStatus } = useStore();

    // Fetch data from centralized store (Server)
    useEffect(() => {
        if (isAuthenticated) {
            useStore.getState().fetchData();
        }
    }, [isAuthenticated]);

    // Polling / Real-time updates (Optional, simple polling for now)
    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(() => {
                useStore.getState().fetchData();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    // Listen for changes in the store
    useEffect(() => {
        if (isAuthenticated) {
            const unsubscribe = useStore.subscribe((state) => {
                setDashboardData({
                    visits: state.visits,
                    messages: state.messages,
                    frozenIps: state.frozenIps,
                    showcaseItems: state.showcaseItems,
                    resources: state.resources,
                    music: state.music,
                });
            });
            return unsubscribe;
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                setLoginError(false);
            } else {
                setLoginError(true);
                setTimeout(() => setLoginError(false), 2000);
            }
        } catch (error) {
            setLoginError(true);
            setTimeout(() => setLoginError(false), 2000);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md glass p-10 rounded-[2.5rem] border-white/5"
                >
                    <div className="flex justify-between items-center mb-10">
                        <div className="w-16 h-16 bg-sky-400/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-400/20">
                            <ShieldCheck size={32} />
                        </div>
                        {onClose && (
                            <motion.button
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-3 glass rounded-full text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </motion.button>
                        )}
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white text-center mb-2">Vault Access</h2>
                    <p className="text-slate-500 text-center text-xs uppercase tracking-widest font-bold mb-10">Archive Administration Protocol</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold ml-4">Access Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                                className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-sky-400/50 transition-all`}
                                placeholder="••••••••"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">Invalid Credentials</p>}

                        <div className="flex flex-col gap-4">
                            <button className="w-full bg-sky-400 text-black font-bold uppercase tracking-widest text-xs py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Initiate Handshake
                            </button>

                            <button
                                type="button"
                                onClick={() => window.open(window.location.origin, '_blank')}
                                className="w-full bg-white/5 text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[9px] py-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <ExternalLink size={12} /> View Site in New Tab
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-sky-400/30">
            {/* Sidebar Nav (Desktop) */}
            <nav className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex-col gap-4">
                {[
                    { id: 'overview', icon: <TrendingUp size={18} />, label: 'Overview' },
                    { id: 'visitors', icon: <Users size={18} />, label: 'Audits' },
                    { id: 'comms', icon: <Mic2 size={18} />, label: 'Comms' },
                    { id: 'showcase', icon: <Layout size={18} />, label: 'Showcase' },
                    { id: 'resources', icon: <HardDrive size={18} />, label: 'Resources' },
                    { id: 'music', icon: <Music size={18} />, label: 'Music' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`p-4 rounded-2xl transition-all group relative ${activeTab === item.id ? 'bg-sky-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.3)]' : 'glass text-slate-400 hover:text-sky-300'
                            }`}
                    >
                        {item.icon}
                        <span className="absolute left-full ml-4 px-3 py-1 bg-black border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all white-space-nowrap">
                            {item.label}
                        </span>
                    </button>
                ))}
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="mt-12 p-4 glass text-slate-500 hover:text-red-400 rounded-2xl transition-all"
                >
                    <LogOut size={18} />
                </button>
            </nav>

            {/* Bottom Nav (Mobile) */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] flex justify-between items-center glass p-2 rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
                {[
                    { id: 'overview', icon: <TrendingUp size={18} />, label: 'Overview' },
                    { id: 'visitors', icon: <Users size={18} />, label: 'Audits' },
                    { id: 'comms', icon: <Mic2 size={18} />, label: 'Comms' },
                    { id: 'showcase', icon: <Layout size={18} />, label: 'Showcase' },
                    { id: 'resources', icon: <HardDrive size={18} />, label: 'Resources' },
                    { id: 'music', icon: <Music size={18} />, label: 'Music' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-sky-400 text-black' : 'text-slate-400'}`}
                    >
                        {item.icon}
                    </button>
                ))}
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="p-3 text-slate-500 hover:text-red-400"
                >
                    <LogOut size={18} />
                </button>
            </nav>

            <main className="px-6 pb-32 pt-12 md:pl-32 md:pr-12 md:pb-24 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <div className="flex items-center gap-3 text-sky-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                            <Activity size={14} className="animate-pulse" /> Live Administration
                        </div>
                        <h1 className="text-5xl font-display font-bold">Archive <span className="text-sky-300">Intelligence.</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => useStore.getState().fetchData()}
                            className="p-3 glass rounded-xl text-sky-400 hover:bg-sky-400 hover:text-black transition-all group relative"
                            title="Force Sync Data"
                        >
                            <Activity size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded border border-white/10 uppercase tracking-widest font-bold">Manual Sync</span>
                        </button>
                        <div className="glass px-6 py-4 rounded-2xl flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Status</div>
                                <div className="text-sky-300 font-mono text-xs uppercase">Operational // Stable</div>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-sky-400/20 flex items-center justify-center">
                                <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            <StatCard icon={<Eye className="text-sky-300" />} label="Total Visuals" value={dashboardData.visits.length.toString()} trend="+12.4%" />
                            <StatCard icon={<Users className="text-yellow-200" />} label="Unique IPs" value={new Set(dashboardData.visits.map(v => v.ip)).size.toString()} trend="+4.1%" />
                            <StatCard icon={<Mic2 className="text-sky-400" />} label="Neural Syncs" value={dashboardData.messages.length.toString()} trend="Live" />
                            <StatCard icon={<AlertCircle className="text-red-400" />} label="Frozen Nodes" value={dashboardData.frozenIps.length.toString()} trend="Secure" />

                            <div className="col-span-1 md:col-span-2 lg:col-span-3 glass rounded-[3rem] p-10 border-white/5">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-display font-bold">Real-time Traffic Pipeline</h3>
                                    <div className="flex gap-2">
                                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                                        <span className="w-2 h-2 rounded-full bg-white/10" />
                                        <span className="w-2 h-2 rounded-full bg-white/10" />
                                    </div>
                                </div>
                                <div className="h-64 flex items-end gap-1">
                                    {dashboardData.visits.slice(0, 40).map((v, i) => (
                                        <motion.div
                                            key={v.id}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${Math.random() * 80 + 20}%` }}
                                            className="flex-1 bg-sky-400/20 hover:bg-sky-400/50 rounded-t-sm transition-colors cursor-help"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="glass rounded-[3rem] p-10 border-white/5 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-display font-bold mb-6">Recent Path Audits</h3>
                                    <div className="space-y-4">
                                        {dashboardData.visits.slice(0, 5).map(v => (
                                            <div key={v.id} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                                <div className="flex-1">
                                                    <div className="text-[10px] text-white font-mono break-all">{v.path}</div>
                                                    <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">{new Date(v.timestamp).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => setActiveTab('visitors')} className="text-sky-400 text-[10px] font-bold uppercase tracking-widest hover:underline mt-6">View Full Audit Log</button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'visitors' && (
                        <motion.div
                            key="visitors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass rounded-2xl md:rounded-[3rem] border-white/5 overflow-hidden"
                        >
                            <div className="overflow-x-auto scrollbar-hide">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Node IP</th>
                                            <th className="px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Path Access</th>
                                            <th className="px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                                            <th className="px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                                            <th className="px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboardData.visits.map((v) => (
                                            <tr key={v.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-4 md:px-10 py-4 md:py-6">
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <MapPin size={12} className="text-slate-500 flex-shrink-0" />
                                                        <span className="text-[10px] md:text-xs font-mono text-slate-300">{v.ip}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-10 py-4 md:py-6">
                                                    <span className="text-[10px] md:text-xs font-mono text-sky-400/80">{v.path}</span>
                                                </td>
                                                <td className="px-4 md:px-10 py-4 md:py-6">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <Clock size={12} className="flex-shrink-0" />
                                                        <span className="text-[9px] md:text-[10px] font-bold">{new Date(v.timestamp).toLocaleString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-10 py-4 md:py-6">
                                                    <span className={`px-2 md:px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${v.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {v.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-10 py-4 md:py-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            toggleVisitStatus(v.id);
                                                        }}
                                                        className={`p-2 glass rounded-lg transition-all ${v.status === 'active' ? 'text-red-500 hover:text-red-400' : 'text-green-400 hover:text-green-300'}`}
                                                    >
                                                        {v.status === 'active' ? <Lock size={14} /> : <Unlock size={14} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {dashboardData.visits.length === 0 && (
                                <div className="py-20 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">No nodes detected in cycle</div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'comms' && (
                        <motion.div
                            key="comms"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {dashboardData.messages.map((m) => (
                                <div key={m.id} className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-sky-400/30 transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="p-4 bg-sky-400/10 rounded-2xl text-sky-400">
                                                <Mic2 size={24} />
                                            </div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                {new Date(m.timestamp).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-white font-display font-bold text-xl mb-4">Neural Data Chunk</div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-8 italic">Encrypted // {m.duration}s Sequence</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const audio = new Audio(m.audioUrl);
                                            audio.play().catch(e => console.warn("Audio playback failed:", e));
                                        }}
                                        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-sky-400 hover:text-black border border-white/10 hover:border-transparent py-4 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        <Play size={14} fill="currentColor" /> Play Transmission
                                    </button>
                                </div>
                            ))}
                            {dashboardData.messages.length === 0 && (
                                <div className="col-span-full py-20 glass rounded-[3rem] flex flex-col items-center justify-center opacity-50">
                                    <AlertCircle className="text-slate-500 mb-4" size={40} />
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">No Neural Syncs Recorded</div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'showcase' && (
                        <motion.div
                            key="showcase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">Dynamic Showcase Manager</h3>
                                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Reorder, Add, or Remove frames with real-time sync</p>
                                </div>
                                <button
                                    onClick={() => {
                                        useStore.getState().addShowcaseFrame('', 'New Showcase Item');
                                    }}
                                    className="bg-sky-400 text-black font-bold uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
                                >
                                    <Plus size={16} /> Add New Frame
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {dashboardData.showcaseItems.map((item, index) => (
                                    <MediaCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        index={index}
                                        total={dashboardData.showcaseItems.length}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'resources' && (
                        <motion.div
                            key="resources"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">Resource Reservoir</h3>
                                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">1GB+ Capacity // Vercel Blob Integrated</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="glass px-6 py-3 rounded-xl border-white/5 flex items-center gap-3">
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Storage Status</div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-10 rounded-[3rem] border-white/5 border-dashed border-2 flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors cursor-pointer relative overflow-hidden">
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            useStore.getState().addResource({
                                                name: file.name,
                                                url: event.target?.result as string,
                                                type: file.type.includes('video') ? 'video' : file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'archive',
                                                size: file.size
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <div className="w-20 h-20 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Upload size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Initiate Secure Upload</p>
                                    <p className="text-slate-500 text-[9px] uppercase font-medium tracking-widest">Drag & Drop or Click to browse (Max 1GB)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {dashboardData.resources.map((resource) => (
                                    <div key={resource.id} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500">
                                                {resource.type === 'video' ? <Play size={20} /> : <Layout size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">{resource.name}</h4>
                                                <div className="flex items-center gap-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                                    <span>{(resource.size / (1024 * 1024)).toFixed(2)} MB</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span>{resource.type}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span>{new Date(resource.uploadedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right flex items-center gap-4">
                                                <div className="relative group/tip">
                                                    <div className="flex flex-col items-end cursor-help">
                                                        <div className="text-[10px] text-sky-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                                                            <Activity size={10} /> {resource.downloads} Hits
                                                        </div>
                                                        <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">Global Reach</div>
                                                    </div>
                                                    <div className="absolute bottom-full right-0 mb-4 w-48 p-4 glass rounded-xl border-white/10 opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                                        <p className="text-[9px] text-slate-300 leading-relaxed text-right">
                                                            Download analytics are tracked in real-time across all browser nodes.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => useStore.getState().removeResource(resource.id)}
                                                className="p-3 glass rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'music' && (
                        <motion.div
                            key="music"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">Music Room Records</h3>
                                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Poetic Soundscapes // Persistent Audio Storage</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="glass px-6 py-3 rounded-xl border-white/5 flex items-center gap-3">
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Library Size</div>
                                        <div className="text-sky-300 font-mono text-xs">{dashboardData.music.length} Tracks</div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-10 rounded-[3rem] border-white/5 border-dashed border-2 flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors cursor-pointer relative overflow-hidden">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const audio = new Audio();
                                            audio.src = event.target?.result as string;
                                            audio.onloadedmetadata = () => {
                                                useStore.getState().addMusic({
                                                    title: file.name.replace(/\.[^/.]+$/, ""),
                                                    artist: "Aman",
                                                    url: event.target?.result as string,
                                                    duration: audio.duration
                                                });
                                            };
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <div className="w-20 h-20 bg-sky-400/10 rounded-full flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Plus size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Upload New Soundscape</p>
                                    <p className="text-slate-500 text-[9px] uppercase font-medium tracking-widest">WAV / MP3 / AAC Supported</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dashboardData.music.map((track) => (
                                    <div key={track.id} className="glass p-8 rounded-[2rem] border-white/5 flex items-center justify-between hover:border-sky-400/20 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-sky-400/10 rounded-2xl flex items-center justify-center text-sky-400">
                                                <Music size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-display font-bold text-white mb-1">{track.title}</h4>
                                                <div className="flex items-center gap-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">
                                                    <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toFixed(0).padStart(2, '0')}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span>{track.artist}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => {
                                                    const audio = new Audio(track.url);
                                                    audio.play();
                                                }}
                                                className="p-3 glass rounded-xl text-sky-400 hover:bg-sky-400 hover:text-black transition-all"
                                            >
                                                <Play size={16} fill="currentColor" />
                                            </button>
                                            <button
                                                onClick={() => useStore.getState().removeMusic(track.id)}
                                                className="p-3 glass rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, trend: string }> = ({ icon, label, value, trend }) => (
    <div className="glass p-10 rounded-[3rem] border-white/5 hover:border-sky-400/10 transition-all">
        <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-white/5 rounded-xl text-slate-400">
                {icon}
            </div>
            <div className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-green-400' : 'text-sky-300'} uppercase tracking-widest`}>
                {trend}
            </div>
        </div>
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{label}</div>
        <div className="text-4xl font-display font-bold text-white">{value}</div>
    </div>
);

const MediaCard: React.FC<{ id: string, title: string, image: string, index: number, total: number }> = ({ id, title, image, index, total }) => {
    const { setShowcaseImage, removeShowcaseFrame, reorderShowcase } = useStore();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > 1200) {
                    height = (1200 / width) * height;
                    width = 1200;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                setShowcaseImage(id as any, compressedBase64);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-sky-400/20 transition-all group relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">{title}</h3>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Index: {index + 1} // ID: {id}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        disabled={index === 0}
                        onClick={() => reorderShowcase(index, index - 1)}
                        className="p-2 glass rounded-lg text-slate-500 hover:text-sky-400 disabled:opacity-30"
                    >
                        <ArrowUp size={12} />
                    </button>
                    <button
                        disabled={index === total - 1}
                        onClick={() => reorderShowcase(index, index + 1)}
                        className="p-2 glass rounded-lg text-slate-500 hover:text-sky-400 disabled:opacity-30"
                    >
                        <ArrowDown size={12} />
                    </button>
                    <button
                        onClick={() => removeShowcaseFrame(id)}
                        className="p-2 glass rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-8 relative flex items-center justify-center">
                {image ? (
                    <img src={image} className="w-full h-full object-cover" alt={title} />
                ) : (
                    <div className="text-slate-700 font-mono text-[8px] uppercase">Empty Docket</div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-sky-400 text-black p-3 rounded-full hover:scale-110 transition-transform">
                        <Upload size={16} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                    </label>
                </div>
            </div>

            <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.2em] text-center">
                Real-time Sync Active
            </p>
        </div>
    );
};

export default AdminDashboard;
