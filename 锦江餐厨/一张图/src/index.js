import './index.html';
// import 'antd/dist/antd.css'
import './index.less';
import dva from 'dva';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();
app.use(createLoading());
// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/videoPanelM'));
app.model(require('./models/routePanelM'));
app.model(require('./models/carPanelM'));
app.model(require('./models/dataPanelM'));
app.model(require('./models/collectorPanelM'));
app.model(require('./models/merchantPanelM'));
app.model(require('./models/bottomPanelM'));
app.model(require('./models/searchBox'));
app.model(require('./models/toolBarM'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
