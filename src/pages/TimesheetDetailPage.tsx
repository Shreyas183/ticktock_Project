import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Timesheet, TimesheetEntry, Project, WorkType, CreateTimesheetEntryRequest } from '../types';
import { formatDate, getWeekDates, getDayName, isWeekend } from '../utils';

const TimesheetDetailPage: React.FC = () => {
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newEntry, setNewEntry] = useState({
    projectId: '',
    workTypeId: '',
    description: '',
    hours: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetchTimesheet();
    fetchProjects();
    fetchWorkTypes();
  }, [id, navigate]);

  const fetchTimesheet = async () => {
    try {
      const response = await fetch(`/api/timesheets/${id}`);
      const data = await response.json();
      setTimesheet(data);
    } catch (error) {
      console.error('Failed to fetch timesheet:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchWorkTypes = async () => {
    try {
      const response = await fetch('/api/work-types');
      const data = await response.json();
      setWorkTypes(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch work types:', error);
      setLoading(false);
    }
  };

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setShowAddModal(true);
    setNewEntry({
      projectId: projects[0]?.id || '',
      workTypeId: workTypes[0]?.id || '',
      description: '',
      hours: 0,
    });
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timesheet) return;

    setIsSubmitting(true);
    try {
      const entryData: CreateTimesheetEntryRequest = {
        timesheetId: timesheet.id,
        date: selectedDate,
        projectId: newEntry.projectId,
        workTypeId: newEntry.workTypeId,
        description: newEntry.description,
        hours: newEntry.hours,
      };

      const response = await fetch('/api/timesheets/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        setShowAddModal(false);
        fetchTimesheet(); // Refresh the timesheet data
      } else {
        console.error('Failed to create entry');
      }
    } catch (error) {
      console.error('Error creating entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEntriesForDate = (date: string): TimesheetEntry[] => {
    if (!timesheet) return [];
    return timesheet.entries.filter(entry => entry.date === date);
  };

  const getTotalHoursForDate = (date: string): number => {
    const entries = getEntriesForDate(date);
    return entries.reduce((total, entry) => total + entry.hours, 0);
  };

  const getProjectName = (projectId: string): string => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const getWorkTypeName = (workTypeId: string): string => {
    const workType = workTypes.find(wt => wt.id === workTypeId);
    return workType?.name || 'Unknown Work Type';
  };

  if (loading || !timesheet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const weekDates = getWeekDates(timesheet.weekStartDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/timesheets')}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">ticktock</h1>
              <nav className="ml-4">
                <span className="text-gray-500 text-sm">Timesheets</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">John Doe ▼</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">This week's timesheet</h2>
                <p className="text-sm text-gray-500">
                  {formatDate(timesheet.weekStartDate)} - {formatDate(timesheet.weekEndDate)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{timesheet.totalHours}hrs</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>

          {/* Daily Entries */}
          <div className="divide-y divide-gray-200">
            {weekDates.map((date) => {
              const entries = getEntriesForDate(date);
              const totalHours = getTotalHoursForDate(date);
              const dayName = getDayName(date);
              const isWeekendDay = isWeekend(date);

              return (
                <div key={date} className={`p-6 ${isWeekendDay ? 'bg-gray-50' : ''}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {dayName} {new Date(date).getDate()}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{totalHours} hrs</div>
                      <div className="text-xs text-gray-500">
                        {entries.length > 0 ? `${entries.length} entries` : 'No entries'}
                      </div>
                    </div>
                  </div>

                  {/* Entries for this date */}
                  <div className="space-y-3 mb-4">
                    {entries.map((entry) => (
                      <div key={entry.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {getProjectName(entry.projectId)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {getWorkTypeName(entry.workTypeId)}
                          </div>
                          {entry.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {entry.description}
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.hours} hrs
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            ProjectName
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new task button */}
                  {!isWeekendDay && (
                    <button
                      onClick={() => handleAddTask(date)}
                      className="w-full border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700 py-3 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      + Add new task
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add New Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Entry</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Project *
                </label>
                <select
                  value={newEntry.projectId}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, projectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Work *
                </label>
                <select
                  value={newEntry.workTypeId}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, workTypeId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {workTypes.map(workType => (
                    <option key={workType.id} value={workType.id}>
                      {workType.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description *
                </label>
                <textarea
                  value={newEntry.description}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Write task here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={newEntry.hours || ''}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, hours: parseFloat(e.target.value) || 0 }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-gray-500">hours</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? 'Adding...' : 'Add entry'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimesheetDetailPage;