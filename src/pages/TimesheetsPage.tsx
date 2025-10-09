import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timesheet, PaginatedResponse } from '../types';
import { formatDateRange } from '../utils';

const TimesheetsPage: React.FC = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchTimesheets();
  }, [currentPage, statusFilter, dateRange, navigate]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '5',
      });

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (dateRange.start && dateRange.end) {
        params.append('startDate', dateRange.start);
        params.append('endDate', dateRange.end);
      }

      const response = await fetch(`/api/timesheets?${params}`);
      const data: PaginatedResponse<Timesheet> = await response.json();
      
      setTimesheets(data.data);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch timesheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            COMPLETED
          </span>
        );
      case 'incomplete':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            INCOMPLETE
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            MISSING
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
            UNKNOWN
          </span>
        );
    }
  };

  const getActionButton = (timesheet: Timesheet) => {
    switch (timesheet.status) {
      case 'completed':
        return (
          <button
            onClick={() => navigate(`/timesheets/${timesheet.id}`)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View
          </button>
        );
      case 'incomplete':
        return (
          <button
            onClick={() => navigate(`/timesheets/${timesheet.id}`)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Update
          </button>
        );
      case 'missing':
        return (
          <button
            onClick={() => navigate(`/timesheets/${timesheet.id}`)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create
          </button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">ticktock</h1>
              <nav className="ml-8">
                <span className="text-gray-500 text-sm">Timesheets</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.name || 'John Doe'} ▼
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Green border from the design */}
          <div className="border-t-4 border-green-500 rounded-t-lg">
            {/* Filters */}
            <div className="p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">Your Timesheets</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">Status</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="missing">Missing</option>
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Date Range</option>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      WEEK #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timesheets.map((timesheet, index) => (
                    <tr key={timesheet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {(currentPage - 1) * 5 + index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateRange(timesheet.weekStartDate, timesheet.weekEndDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(timesheet.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getActionButton(timesheet)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-6 py-4 flex items-center justify-between border-t">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">5 per page</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Previous</span>
                  {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm ${
                        page === currentPage
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {totalPages > 10 && (
                    <>
                      <span className="text-gray-500">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <span className="text-sm text-gray-700">Next</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimesheetsPage;