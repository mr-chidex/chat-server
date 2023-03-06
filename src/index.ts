import app from './app';
import config from './config';
import { AppDataSource } from './data-source';
import io from './socket';

const PORT = config.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('db connected...');
    const server = app.listen(PORT, () => console.log(`server running on PORT:: 🚀💥>>> ${PORT}`));

    io.init(server);
  })
  .catch((_error) => console.log('error connecting db>>>', _error));
