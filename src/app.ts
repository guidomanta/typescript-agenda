import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';

//Routes
import indexRoutes from './routes';
import usersRoutes from './routes/users';
import appointmentsRoutes from './routes/appointments';

class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', __dirname + '/views');
        this.app.engine('.hbs', engine({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'index',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/users', usersRoutes);
        this.app.use('/appointments', appointmentsRoutes);

        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}

export default Application;