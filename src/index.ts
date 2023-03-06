import './app';
import { AppDataSource } from './data-source';
import io from './socket';

AppDataSource.initialize()
  .then(() => {
    console.log('db connected...');
    io.init();
  })
  .catch((_error) => console.log('error connecting db>>>', _error));
