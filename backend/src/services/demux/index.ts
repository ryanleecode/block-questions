import { BaseActionWatcher } from 'demux';
import { MongoActionReader, NodeosActionReader } from 'demux-eos';

import { ActionHandler } from './actionHandler';

import { updaters as updaters2 } from '../../questions';
import effects from './effects';
import updaters from './updaters';

const actionHandler = new ActionHandler(
  [...updaters, ...updaters2],
  effects,
  process.env.MONGODB_URL || 'mongodb_url required',
);

const actionReader = new NodeosActionReader(
  process.env.EOSIO_HTTP_URL,
  parseInt(process.env.EOSIO_STARTING_BLOCK || '1', 10), // First actions relevant to this dapp happen at this block
);

const BLOCK_INTERVAL = 250;
const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  BLOCK_INTERVAL, // Poll at twice the block interval for less latency
);

export { actionWatcher };
