'use client';

import { useState } from 'react';

interface Metric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface ChartData {
  month: string;
  students: number;
  revenue: number;
  ratings: number;
}

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics: Metric[] = [
    {
      label: 'Total Revenue',
      value: '$12,450',
      change: '+15.3%',
      changeType: 'positive',
      icon: '💰'
    },
    {
      label: 'New Students',
      value: '247',
      change: '+8.2%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      label: 'Course Completion',
      value: '78.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: '✅'
    },
    {
      label: 'Average Rating',
      value: '4.8',
      change: '+0.1',
      changeType: 'positive',
      icon: '⭐'
    }
  ];

  const chartData: ChartData[] = [
    { month: 'Jan', students: 45, revenue: 1350, ratings: 4.7 },
    { month: 'Feb', students: 52, revenue: 1560, ratings: 4.8 },
    { month: 'Mar', students: 38, revenue: 1140, ratings: 4.6 },
    { month: 'Apr', students: 67, revenue: 2010, ratings: 4.9 },
    { month: 'May', students: 89, revenue: 2670, ratings: 4.8 },
    { month: 'Jun', students: 94, revenue: 2820, ratings: 4.9 }
  ];

  const topCourses = [
    { name: 'Web Development Bootcamp', students: 145, revenue: 4350, rating: 4.9 },
    { name: 'React Advanced Patterns', students: 98, revenue: 2940, rating: 4.8 },
    { name: 'Python for Data Science', students: 76, revenue: 2280, rating: 4.7 },
    { name: 'UI/UX Design Fundamentals', students: 54, revenue: 1620, rating: 4.6 }
  ];

  const studentDemographics = [
    { category: 'Age 18-24', percentage: 35, color: 'bg-primary' },
    { category: 'Age 25-34', percentage: 45, color: 'bg-secondary' },
    { category: 'Age 35-44', percentage: 15, color: 'bg-accent' },
    { category: 'Age 45+', percentage: 5, color: 'bg-highlight' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading mb-2">Insights & Analytics</h1>
          <p className="text-body">Track your course performance and student engagement</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-secondary bg-card text-heading rounded-lg focus:border-primary"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-heading mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${
                  metric.changeType === 'positive'
                    ? 'text-success'
                    : metric.changeType === 'negative'
                    ? 'text-red-500'
                    : 'text-muted'
                }`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className="text-3xl">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-heading mb-4">Revenue Trends</h3>
          <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-body">Revenue chart visualization</p>
              <p className="text-muted text-sm">Chart component would go here</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            {chartData.slice(-3).map((data) => (
              <div key={data.month} className="p-3 bg-softPurple rounded-lg">
                <div className="text-lg font-bold text-heading">${data.revenue}</div>
                <div className="text-sm text-muted">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Demographics */}
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-heading mb-4">Student Demographics</h3>
          <div className="space-y-4">
            {studentDemographics.map((demo, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-body">{demo.category}</span>
                  <span className="text-heading font-medium">{demo.percentage}%</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${demo.color}`}
                    style={{ width: `${demo.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-softPurple rounded-lg">
            <h4 className="font-semibold text-heading mb-2">💡 Insight</h4>
            <p className="text-body text-sm">Your courses appeal most to professionals aged 25-34</p>
          </div>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div className="bg-card rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-heading mb-6">Top Performing Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary/20">
                <th className="text-left py-3 px-4 text-heading font-semibold">Course</th>
                <th className="text-center py-3 px-4 text-heading font-semibold">Students</th>
                <th className="text-center py-3 px-4 text-heading font-semibold">Revenue</th>
                <th className="text-center py-3 px-4 text-heading font-semibold">Rating</th>
                <th className="text-center py-3 px-4 text-heading font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course, index) => (
                <tr key={index} className="border-b border-secondary/10 hover:bg-softPurple/30">
                  <td className="py-4 px-4">
                    <div className="font-medium text-heading">{course.name}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-medium text-heading">{course.students}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-medium text-heading">${course.revenue.toLocaleString()}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="font-medium text-heading">{course.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-success font-medium">↗️ +12%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-heading mb-4">Course Engagement</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-body text-sm">Average watch time</span>
              <span className="font-medium text-heading">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-sm">Quiz completion rate</span>
              <span className="font-medium text-heading">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-sm">Assignment submissions</span>
              <span className="font-medium text-heading">78%</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-heading mb-4">Student Feedback</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-body text-sm">Helpful content</span>
              <span className="font-medium text-heading">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-sm">Clear explanations</span>
              <span className="font-medium text-heading">96%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-sm">Would recommend</span>
              <span className="font-medium text-heading">89%</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-heading mb-4">Growth Opportunities</h4>
          <div className="space-y-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="text-success text-sm font-medium">High potential: Mobile Development</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <p className="text-info text-sm font-medium">Trending: AI & Machine Learning</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="text-accent text-sm font-medium">Seasonal: Holiday Projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
