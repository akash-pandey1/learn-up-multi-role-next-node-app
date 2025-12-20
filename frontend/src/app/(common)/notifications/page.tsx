'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'course',
    title: 'New Course Available',
    message: 'Advanced React Development course is now available. Enroll now!',
    time: '2 hours ago',
    read: false,
    actionUrl: '/discover'
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'John Doe sent you a message about your recent enrollment.',
    time: '1 day ago',
    read: false,
    actionUrl: '/chat'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You completed your first course milestone.',
    time: '3 days ago',
    read: true,
    actionUrl: '/dashboard'
  },
  {
    id: 4,
    type: 'system',
    title: 'Account Security',
    message: 'Your password was changed successfully. If this wasn\'t you, please contact support.',
    time: '1 week ago',
    read: true,
    actionUrl: '/account'
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Course Reminder',
    message: 'Don\'t forget to complete your React Basics course. You have 2 days left.',
    time: '2 weeks ago',
    read: true,
    actionUrl: '/dashboard'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'message': return '💬';
      case 'achievement': return '🏆';
      case 'system': return '⚙️';
      case 'reminder': return '⏰';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-primary';
      case 'message': return 'text-secondary';
      case 'achievement': return 'text-accent';
      case 'system': return 'text-info';
      case 'reminder': return 'text-highlight';
      default: return 'text-body';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading mb-2">Notifications</h1>
            <p className="text-body">
              Stay updated with your latest activities and messages
              {unreadCount > 0 && (
                <span className="ml-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} size="sm">
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'course', label: 'Courses' },
            { key: 'message', label: 'Messages' },
            { key: 'achievement', label: 'Achievements' },
            { key: 'system', label: 'System' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-primary text-white'
                  : 'bg-softPurple text-heading hover:bg-softPurple/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-heading mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications found'}
            </h3>
            <p className="text-body">
              {filter === 'unread'
                ? 'You\'ve read all your notifications!'
                : `No ${filter} notifications at the moment.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card rounded-lg shadow-sm p-6 border-l-4 transition-all hover:shadow-md ${
                notification.read ? 'border-secondary/30' : 'border-primary'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`text-2xl ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${notification.read ? 'text-body' : 'text-heading'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${notification.read ? 'text-muted' : 'text-body'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted">{notification.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Mark Read
                    </button>
                  )}
                  <a
                    href={notification.actionUrl}
                    className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    View
                  </a>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-muted hover:text-heading text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Settings */}
      <div className="mt-12 bg-card rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-heading mb-4">Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">Push notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">SMS notifications</span>
            </label>
          </div>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">Course reminders</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">New message alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-secondary text-primary focus:ring-primary" />
              <span className="ml-3 text-body">Marketing updates</span>
            </label>
          </div>
        </div>
        <Button className="mt-4" size="sm">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
