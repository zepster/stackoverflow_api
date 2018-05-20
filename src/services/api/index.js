import { serviceName, service } from './stackoverflow';
import config from '../../consts';

export function getService(name) {
  switch (name) {
    case serviceName:
      return service(config.stackApiKey);
    default: 
      return service(config.stackApiKey);
  }
}

export const serviceNames = {
  [serviceName]: serviceName
};