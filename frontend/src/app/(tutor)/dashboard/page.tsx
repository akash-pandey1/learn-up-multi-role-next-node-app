'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface RecentActivity {
  id: string;
  type: 'enrollment' | 'completion' | 'review' | 'message';
  title: string;
  description: string;
  time: string;
}

interface UpcomingClass {
  id: string;
  title: string;
  time: string;
  students: number;
  type: 'live' | 'recorded';
}

const stats: StatCard[] = [
  {
    title: 'Total Students',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: '👥'
  },
  {
    title: 'Active Courses',
    value: '8',
    change: '+2',
    changeType: 'positive',
    icon: '📚'
  },
  {
    title: 'Revenue This Month',
    value: '$4,250',
    change: '+8%',
    changeType: 'positive',
    icon: '💰'
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: '+0.2',
    changeType: 'positive',
    icon: '⭐'
  }
];

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Enrollment',
    description: 'Sarah Johnson enrolled in "Advanced React Development"',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'completion',
    title: 'Course Completed',
    description: 'Mike Chen completed "JavaScript Fundamentals"',
    time: '4 hours ago'
  },
  {
    id: '3',
    type: 'review',
    title: 'New Review',
    description: '5-star review on "Python for Data Science"',
    time: '6 hours ago'
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'Question from student about assignment',
    time: '1 day ago'
  }
];

const upcomingClasses: UpcomingClass[] = [
  {
    id: '1',
    title: 'Live Q&A Session',
    time: 'Today, 3:00 PM',
    students: 12,
    type: 'live'
  },
  {
    id: '2',
    title: 'React Workshop',
    time: 'Tomorrow, 2:00 PM',
    students: 25,
    type: 'live'
  },
  {
    id: '3',
    title: 'Office Hours',
    time: 'Friday, 10:00 AM',
    students: 8,
    type: 'live'
  }
];

export default function TutorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return '👤';
      case 'completion': return '✅';
      case 'review': return '⭐';
      case 'message': return '💬';
      default: return '📌';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="opacity-90">Here's what's happening with your courses today.</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Last login</p>
            <p className="font-medium">Today at 9:30 AM</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-heading mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive'
                    ? 'text-success'
                    : stat.changeType === 'negative'
                    ? 'text-red-500'
                    : 'text-muted'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm">
            <div className="p-6 border-b border-secondary/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-heading">Recent Activity</h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 rounded border border-secondary bg-card text-body text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-secondary/10">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-softPurple/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-heading font-medium">{activity.title}</h3>
                        <span className="text-muted text-sm">{activity.time}</span>
                      </div>
                      <p className="text-body text-sm mt-1">{activity.description}</p>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-secondary/20">
              <button className="w-full text-primary hover:text-primary/80 font-medium">
                View All Activity →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-heading mb-4">Upcoming Classes</h3>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 bg-softPurple rounded-lg">
                  <div>
                    <h4 className="text-heading font-medium text-sm">{classItem.title}</h4>
                    <p className="text-muted text-xs">{classItem.time}</p>
                    <p className="text-body text-xs">{classItem.students} students</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    classItem.type === 'live'
                      ? 'bg-success text-white'
                      : 'bg-info text-white'
                  }`}>
                    {classItem.type === 'live' ? 'Live' : 'Recorded'}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-primary hover:text-primary/80 font-medium">
              Schedule New Class →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-heading mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="primary" size="sm" className="justify-start">
                📝 Create Course
              </Button>
              <Button variant="secondary" size="sm" className="justify-start">
                📊 View Analytics
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                💬 Student Chat
              </Button>
              <Button variant="secondary" size="sm" className="justify-start">
                📧 Send Announcement
              </Button>
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-heading mb-4">Top Performing Course</h3>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="text-heading font-semibold">Advanced React Development</h4>
              <p className="text-body text-sm mt-1">247 students • 4.9 ⭐</p>
              <div className="mt-4 bg-success/20 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-muted text-xs mt-1">92% completion rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
