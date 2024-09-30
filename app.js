require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const { Chat } = require('./models');

const indexRouter = require('./routes/index');
const regionRouter = require('./routes/region');
const whatsappBotRouter = require('./routes/whatsappbot');
const complaintRouter = require('./routes/complaint');
const pmbonlineRouter = require('./routes/pmbonline');
const historyRouter = require('./routes/history');
const misilRouter = require('./routes/misil');
const whatsappRouter = require('./routes/whatsapp/whatsapp');
const eventsMemberRouter = require('./routes/events/member');

/* Service Scholarship */
const scholarshipCategoriesRouter = require('./routes/scholarship/categories');
const scholarshipQuestionsRouter = require('./routes/scholarship/questions');
const scholarshipRecordsRouter = require('./routes/scholarship/records');
const scholarshipAnswersRouter = require('./routes/scholarship/answers');
const scholarshipHistoriesRouter = require('./routes/scholarship/histories');

/* Service Psikotest */
const psikotestUsersRouter = require('./routes/psikotest/users');
const psikotestTypesRouter = require('./routes/psikotest/types');
const psikotestQuestionsRouter = require('./routes/psikotest/questions');
const psikotestTestsRouter = require('./routes/psikotest/tests');
const psikotestHasilsRouter = require('./routes/psikotest/hasils');

/* Service Brain */
const brainHasilsRouter = require('./routes/brain/hasils');
const brainAnswersRouter = require('./routes/brain/answers');

/* Service Test Gaya Belajar */
const gayabelajarDetailsRouter = require('./routes/gayabelajar/details');
const gayabelajarQuestionsRouter = require('./routes/gayabelajar/questions');
const gayabelajarHasilsRouter = require('./routes/gayabelajar/hasils');
const gayabelajarTestsRouter = require('./routes/gayabelajar/tests');
const gayabelajarUsersRouter = require('./routes/gayabelajar/users');

/* Service Helpdesk */
const reportsHelpdeskRouter = require('./routes/helpdesk/reports');
const usersHelpdeskRouter = require('./routes/helpdesk/users');
const roomsHelpdeskRouter = require('./routes/helpdesk/rooms');
const chatsHelpdeskRouter = require('./routes/helpdesk/chats');
const authHelpdeskRouter = require('./routes/helpdesk/auth');

/* Service PMB Online */
const pmbAuthRouter = require('./routes/pmb/auth');
const pmbUsersRouter = require('./routes/pmb/users');
const pmbPresentersRouter = require('./routes/pmb/presenters');
const pmbAchievementsRouter = require('./routes/pmb/achievements');
const pmbOrganizationsRouter = require('./routes/pmb/organizations');
const pmbProfilesRouter = require('./routes/pmb/profiles');
const pmbApplicantsRouter = require('./routes/pmb/applicants');
const pmbSchoolsRouter = require('./routes/pmb/schools');
const pmbUseruploadRouter = require('./routes/pmb/userupload');
const pmbIntegrationSiakadTasikRouter = require('./routes/pmb/integrations/SIAKAD-TASIK/siakad-applicants');

/* Service Dashboard */
const dashboardProgramRouter = require('./routes/dashboard/programs');

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'https://test-gaya-belajar.politekniklp3i-tasikmalaya.ac.id',
  'https://psikotest.politekniklp3i-tasikmalaya.ac.id',
  'https://test-otak.politekniklp3i-tasikmalaya.ac.id',
  'https://beasiswa.politekniklp3i-tasikmalaya.ac.id',
  'https://helpdesk.politekniklp3i-tasikmalaya.ac.id',
  'https://database.politekniklp3i-tasikmalaya.ac.id',
  'https://presence.politekniklp3i-tasikmalaya.ac.id',
  'https://siruang.politekniklp3i-tasikmalaya.ac.id',
  'https://sbpmb.politekniklp3i-tasikmalaya.ac.id',
  'https://ict.politekniklp3i-tasikmalaya.ac.id',
  'https://pmb.politekniklp3i-tasikmalaya.ac.id',
  'https://siakad.politekniklp3i-tasikmalaya.ac.id',
  'https://politekniklp3i-tasikmalaya.ac.id',
  'https://pmb.amisbudi.cloud',
  'https://farah-forgive.vercel.app',
  'http://127.0.0.1:8000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5500',
  'http://localhost:8000',
  'http://localhost:5173',
  'http://localhost:5500',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'gateway',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/', indexRouter);
app.use('/region', regionRouter);
app.use('/whatsappbot', whatsappBotRouter);
app.use('/complaint', complaintRouter);
app.use('/pmbonline', pmbonlineRouter);
app.use('/history', historyRouter);
app.use('/misil', misilRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/events/members', eventsMemberRouter);

/* Service Scholarship */
app.use('/scholarship/categories', scholarshipCategoriesRouter);
app.use('/scholarship/questions', scholarshipQuestionsRouter);
app.use('/scholarship/records', scholarshipRecordsRouter);
app.use('/scholarship/answers', scholarshipAnswersRouter);
app.use('/scholarship/histories', scholarshipHistoriesRouter);

/* Service Psikotest */
app.use('/kecerdasan/users', psikotestUsersRouter);
app.use('/kecerdasan/types', psikotestTypesRouter);
app.use('/kecerdasan/questions', psikotestQuestionsRouter);
app.use('/kecerdasan/tests', psikotestTestsRouter);
app.use('/kecerdasan/hasils', psikotestHasilsRouter);

/* Service Brain */
app.use('/brain/hasils', brainHasilsRouter);
app.use('/brain/answers', brainAnswersRouter);

/* Service Test Gaya Belajar */
app.use('/gayabelajar/details', gayabelajarDetailsRouter);
app.use('/gayabelajar/questions', gayabelajarQuestionsRouter);
app.use('/gayabelajar/hasils', gayabelajarHasilsRouter);
app.use('/gayabelajar/tests', gayabelajarTestsRouter);
app.use('/gayabelajar/users', gayabelajarUsersRouter);

/* Service Helpdesk */
app.use('/helpdesk/auth', authHelpdeskRouter);
app.use('/helpdesk/chats', chatsHelpdeskRouter);
app.use('/helpdesk/rooms', roomsHelpdeskRouter);
app.use('/helpdesk/users', usersHelpdeskRouter);
app.use('/helpdesk/reports', reportsHelpdeskRouter);

/* Service PMB Online */
app.use('/pmb/auth', pmbAuthRouter);
app.use('/pmb/users', pmbUsersRouter);
app.use('/pmb/achievements', pmbAchievementsRouter);
app.use('/pmb/organizations', pmbOrganizationsRouter);
app.use('/pmb/presenters', pmbPresentersRouter);
app.use('/pmb/profiles', pmbProfilesRouter);
app.use('/pmb/applicants', pmbApplicantsRouter);
app.use('/pmb/schools', pmbSchoolsRouter);
app.use('/pmb/userupload', pmbUseruploadRouter);
app.use('/pmb/integrations/siakadtasik', pmbIntegrationSiakadTasikRouter);

/* Service Dashboard */
app.use('/dashboard/programs', dashboardProgramRouter);

io.on('connection', (socket) => {
  console.log('client connected');

  socket.on("message", async (response) => {
    if (!response.not_save) {
      try {
        const data = await Chat.create({
          client: response.client,
          name_room: response.name_room,
          token: response.token,
          not_save: response.not_save,
          uuid_sender: response.uuid_sender,
          name_sender: response.name_sender,
          role_sender: response.role_sender,
          message: response.message,
          reply: response.reply,
          date: response.date,
          latitude: response.latitude,
          longitude: response.longitude,
        });
        io.emit('message', data)
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const data = {
        client: response.client,
        name_room: response.name_room,
        token: response.token,
        not_save: response.not_save,
        uuid_sender: response.uuid_sender,
        name_sender: response.name_sender,
        role_sender: response.role_sender,
        message: response.message,
        reply: response.reply,
        date: response.date,
        latitude: response.latitude,
        longitude: response.longitude,
      };
      io.emit('message', data)
    }
  });
});

module.exports = { app, server };
