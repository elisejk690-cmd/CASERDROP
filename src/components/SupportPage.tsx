import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Ticket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  messages: Array<{
    id: string;
    sender: string;
    senderRole: string;
    text: string;
    timestamp: number;
  }>;
  status: 'open' | 'closed';
  createdAt: number;
}

const TICKETS_KEY = 'caser_drop_tickets';

function getTickets(): Ticket[] {
  try {
    const tickets = localStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch {
    return [];
  }
}

function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export default function SupportPage() {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewTicket, setShowNewTicket] = useState(false);

  const isAdmin = currentUser && ['admin', 'head_admin', 'curator', 'founder'].includes(currentUser.role);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const userTickets = isAdmin ? tickets : tickets.filter(t => t.userId === currentUser?.id);

  const createTicket = () => {
    if (!newSubject.trim() || !currentUser) return;

    const ticket: Ticket = {
      id: `ticket_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      subject: newSubject,
      messages: [],
      status: 'open',
      createdAt: Date.now(),
    };

    const updatedTickets = [ticket, ...tickets];
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setNewSubject('');
    setShowNewTicket(false);
    setSelectedTicket(ticket);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTicket || !currentUser) return;

    const message = {
      id: `msg_${Date.now()}`,
      sender: currentUser.username,
      senderRole: currentUser.role,
      text: newMessage,
      timestamp: Date.now(),
    };

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, messages: [...t.messages, message] };
      }
      return t;
    });

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, messages: [...selectedTicket.messages, message] });
    setNewMessage('');
  };

  if (selectedTicket) {
    return (
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedTicket(null)}
          className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
        >
          ← Назад к тикетам
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{selectedTicket.subject}</h2>
          <p className="text-white/40 text-sm mb-6">От: {selectedTicket.username}</p>

          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {selectedTicket.messages.length === 0 ? (
              <p className="text-white/40 text-center py-8">Нет сообщений. Начните переписку!</p>
            ) : (
              selectedTicket.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === currentUser?.username ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 ${
                      msg.sender === currentUser?.username
                        ? 'bg-purple-500/20 border border-purple-500/30'
                        : ['admin', 'head_admin', 'curator', 'founder'].includes(msg.senderRole)
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {msg.sender !== currentUser?.username && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{msg.sender}</span>
                        {['admin', 'head_admin', 'curator', 'founder'].includes(msg.senderRole) && (
                          <Shield size={12} className="text-blue-400" />
                        )}
                      </div>
                    )}
                    <p className="text-white text-sm">{msg.text}</p>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date(msg.timestamp).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Введите сообщение..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium flex items-center gap-2"
            >
              <Send size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl caser-drop-title text-white mb-3">Техническая поддержка</h1>
        <p className="text-white/50">Свяжитесь с администраторами</p>
      </motion.div>

      {!showNewTicket && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewTicket(true)}
          className="w-full mb-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold flex items-center justify-center gap-2"
        >
          <MessageSquare size={20} />
          Создать тикет
        </motion.button>
      )}

      {showNewTicket && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white font-bold mb-4">Новый тикет</h3>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Тема обращения"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:border-purple-500/50 focus:outline-none"
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createTicket}
              className="flex-1 py-3 rounded-xl bg-purple-500 text-white font-medium"
            >
              Создать
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowNewTicket(false);
                setNewSubject('');
              }}
              className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium"
            >
              Отмена
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {userTickets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center"
          >
            <MessageSquare size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50">У вас нет тикетов</p>
          </motion.div>
        ) : (
          userTickets.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium">{ticket.subject}</h3>
                  <p className="text-white/40 text-sm mt-1">
                    {isAdmin && `От: ${ticket.username} • `}
                    {new Date(ticket.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {ticket.messages.length > 0 && (
                    <span className="text-white/40 text-sm">
                      {ticket.messages.length} {ticket.messages.length === 1 ? 'сообщение' : 'сообщений'}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'open'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {ticket.status === 'open' ? 'Открыт' : 'Закрыт'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
