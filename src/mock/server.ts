import { createServer, Model, Factory, Response } from 'miragejs';
import { User, Project, WorkType, Timesheet, TimesheetEntry } from '../types';

// Mock data
const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
};

const mockProjects: Project[] = [
  { id: '1', name: 'Homepage Development' },
  { id: '2', name: 'Mobile App Development' },
  { id: '3', name: 'E-commerce Platform' },
  { id: '4', name: 'Dashboard Redesign' },
];

const mockWorkTypes: WorkType[] = [
  { id: '1', name: 'Development' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Testing' },
  { id: '4', name: 'Meeting' },
  { id: '5', name: 'Planning' },
];

const mockTimesheetEntries: TimesheetEntry[] = [
  {
    id: '1',
    timesheetId: '1',
    date: '2024-01-01',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 8,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z',
  },
  {
    id: '2',
    timesheetId: '1',
    date: '2024-01-02',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 8,
    createdAt: '2024-01-02T08:00:00Z',
    updatedAt: '2024-01-02T08:00:00Z',
  },
  {
    id: '3',
    timesheetId: '1',
    date: '2024-01-03',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 8,
    createdAt: '2024-01-03T08:00:00Z',
    updatedAt: '2024-01-03T08:00:00Z',
  },
  {
    id: '4',
    timesheetId: '1',
    date: '2024-01-04',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 8,
    createdAt: '2024-01-04T08:00:00Z',
    updatedAt: '2024-01-04T08:00:00Z',
  },
  {
    id: '5',
    timesheetId: '1',
    date: '2024-01-05',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 8,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z',
  },
  // Week 2 - Incomplete
  {
    id: '6',
    timesheetId: '2',
    date: '2024-01-08',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 6,
    createdAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-08T08:00:00Z',
  },
  {
    id: '7',
    timesheetId: '2',
    date: '2024-01-09',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 7,
    createdAt: '2024-01-09T08:00:00Z',
    updatedAt: '2024-01-09T08:00:00Z',
  },
  {
    id: '8',
    timesheetId: '2',
    date: '2024-01-10',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 5,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '9',
    timesheetId: '2',
    date: '2024-01-11',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 4,
    createdAt: '2024-01-11T08:00:00Z',
    updatedAt: '2024-01-11T08:00:00Z',
  },
  {
    id: '10',
    timesheetId: '2',
    date: '2024-01-12',
    projectId: '1',
    workTypeId: '1',
    description: 'Homepage Development',
    hours: 3,
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-12T08:00:00Z',
  },
];

const mockTimesheets: Timesheet[] = [
  {
    id: '1',
    userId: '1',
    weekStartDate: '2024-01-01',
    weekEndDate: '2024-01-05',
    status: 'completed',
    totalHours: 40,
    entries: mockTimesheetEntries.slice(0, 5),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T23:59:59Z',
  },
  {
    id: '2',
    userId: '1',
    weekStartDate: '2024-01-08',
    weekEndDate: '2024-01-12',
    status: 'completed',
    totalHours: 40,
    entries: mockTimesheetEntries.slice(5, 10),
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-12T23:59:59Z',
  },
  {
    id: '3',
    userId: '1',
    weekStartDate: '2024-01-15',
    weekEndDate: '2024-01-19',
    status: 'incomplete',
    totalHours: 30,
    entries: [],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-19T23:59:59Z',
  },
  {
    id: '4',
    userId: '1',
    weekStartDate: '2024-01-22',
    weekEndDate: '2024-01-26',
    status: 'completed',
    totalHours: 40,
    entries: [],
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-26T23:59:59Z',
  },
  {
    id: '5',
    userId: '1',
    weekStartDate: '2024-01-29',
    weekEndDate: '2024-02-02',
    status: 'missing',
    totalHours: 0,
    entries: [],
    createdAt: '2024-01-29T00:00:00Z',
    updatedAt: '2024-02-02T23:59:59Z',
  },
  {
    id: '6',
    userId: '1',
    weekStartDate: '2024-02-05',
    weekEndDate: '2024-02-09',
    status: 'completed',
    totalHours: 40,
    entries: [],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-09T23:59:59Z',
  },
  {
    id: '7',
    userId: '1',
    weekStartDate: '2024-02-12',
    weekEndDate: '2024-02-16',
    status: 'incomplete',
    totalHours: 25,
    entries: [],
    createdAt: '2024-02-12T00:00:00Z',
    updatedAt: '2024-02-16T23:59:59Z',
  },
  {
    id: '8',
    userId: '1',
    weekStartDate: '2024-02-19',
    weekEndDate: '2024-02-23',
    status: 'completed',
    totalHours: 40,
    entries: [],
    createdAt: '2024-02-19T00:00:00Z',
    updatedAt: '2024-02-23T23:59:59Z',
  },
  {
    id: '9',
    userId: '1',
    weekStartDate: '2024-02-26',
    weekEndDate: '2024-03-01',
    status: 'missing',
    totalHours: 0,
    entries: [],
    createdAt: '2024-02-26T00:00:00Z',
    updatedAt: '2024-03-01T23:59:59Z',
  },
  {
    id: '10',
    userId: '1',
    weekStartDate: '2024-03-04',
    weekEndDate: '2024-03-08',
    status: 'completed',
    totalHours: 40,
    entries: [],
    createdAt: '2024-03-04T00:00:00Z',
    updatedAt: '2024-03-08T23:59:59Z',
  },
  {
    id: '11',
    userId: '1',
    weekStartDate: '2024-03-11',
    weekEndDate: '2024-03-15',
    status: 'incomplete',
    totalHours: 20,
    entries: [],
    createdAt: '2024-03-11T00:00:00Z',
    updatedAt: '2024-03-15T23:59:59Z',
  },
  {
    id: '12',
    userId: '1',
    weekStartDate: '2024-03-18',
    weekEndDate: '2024-03-22',
    status: 'completed',
    totalHours: 40,
    entries: [],
    createdAt: '2024-03-18T00:00:00Z',
    updatedAt: '2024-03-22T23:59:59Z',
  },
];

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      project: Model,
      workType: Model,
      timesheet: Model,
      timesheetEntry: Model,
    },

    factories: {
      user: Factory.extend({
        email: () => 'john@example.com',
        name: () => 'John Doe',
      }),
    },

    seeds(server) {
      // Seed mock data
      server.create('user', mockUser);
      mockProjects.forEach(project => server.create('project', project));
      mockWorkTypes.forEach(workType => server.create('workType', workType));
      mockTimesheets.forEach(timesheet => server.create('timesheet', timesheet));
      mockTimesheetEntries.forEach(entry => server.create('timesheetEntry', entry));
    },

    routes() {
      this.namespace = 'api';

      // Auth endpoints
      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        
        if (email === 'john@example.com' && password === 'password') {
          return {
            user: mockUser,
            token: 'fake-jwt-token-' + Date.now(),
          };
        } else {
          return new Response(401, {}, { error: 'Invalid credentials' });
        }
      });

      // Projects endpoints
      this.get('/projects', () => {
        return mockProjects;
      });

      // Work types endpoints
      this.get('/work-types', () => {
        return mockWorkTypes;
      });

      // Timesheets endpoints
      this.get('/timesheets', (schema, request) => {
        const { queryParams } = request;
        const page = parseInt(Array.isArray(queryParams.page) ? queryParams.page[0] : queryParams.page || '1');
        const limit = parseInt(Array.isArray(queryParams.limit) ? queryParams.limit[0] : queryParams.limit || '5');
        const status = Array.isArray(queryParams.status) ? queryParams.status[0] : queryParams.status;
        const startDate = Array.isArray(queryParams.startDate) ? queryParams.startDate[0] : queryParams.startDate;
        const endDate = Array.isArray(queryParams.endDate) ? queryParams.endDate[0] : queryParams.endDate;

        let filteredTimesheets = [...mockTimesheets];

        // Apply status filter
        if (status && status !== 'all') {
          filteredTimesheets = filteredTimesheets.filter(ts => ts.status === status);
        }

        // Apply date range filter
        if (startDate && endDate) {
          filteredTimesheets = filteredTimesheets.filter(ts => {
            const tsStart = new Date(ts.weekStartDate);
            const filterStart = new Date(startDate);
            const filterEnd = new Date(endDate);
            return tsStart >= filterStart && tsStart <= filterEnd;
          });
        }

        // Sort by week start date (most recent first)
        filteredTimesheets.sort((a, b) => 
          new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
        );

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredTimesheets.slice(startIndex, endIndex);

        return {
          data: paginatedData,
          pagination: {
            current: page,
            total: filteredTimesheets.length,
            pages: Math.ceil(filteredTimesheets.length / limit),
            limit,
          },
        };
      });

      this.get('/timesheets/:id', (schema, request) => {
        const timesheetId = request.params.id;
        const timesheet = mockTimesheets.find(ts => ts.id === timesheetId);
        
        if (!timesheet) {
          return new Response(404, {}, { error: 'Timesheet not found' });
        }

        // Get entries for this timesheet
        const entries = mockTimesheetEntries.filter(entry => entry.timesheetId === timesheetId);
        
        return {
          ...timesheet,
          entries,
        };
      });

      // Timesheet entries endpoints
      this.post('/timesheets/entries', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        
        // Validate required fields
        if (!body.timesheetId || !body.date || !body.projectId || !body.workTypeId || !body.description || body.hours === undefined) {
          return new Response(400, {}, { error: 'Missing required fields' });
        }

        // Validate project and work type exist
        const projectExists = mockProjects.some(p => p.id === body.projectId);
        const workTypeExists = mockWorkTypes.some(wt => wt.id === body.workTypeId);
        
        if (!projectExists || !workTypeExists) {
          return new Response(400, {}, { error: 'Invalid project or work type' });
        }

        // Create new entry
        const newEntry: TimesheetEntry = {
          id: (mockTimesheetEntries.length + 1).toString(),
          timesheetId: body.timesheetId,
          date: body.date,
          projectId: body.projectId,
          workTypeId: body.workTypeId,
          description: body.description,
          hours: body.hours,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Add to mock data
        mockTimesheetEntries.push(newEntry);

        return new Response(201, {}, newEntry);
      });
    },
  });

  return server;
}