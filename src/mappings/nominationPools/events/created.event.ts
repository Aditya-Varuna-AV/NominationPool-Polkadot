//A new pool has been created by a depositor.
import {SubstrateEvent} from '@subql/types';
import { getEventId, getExtrinsicId } from '../../../helper/event.helper';
import { NominationPoolCreatedEvent } from '../../../types';

// A Pool has been created by the depositor
// The created pool is identified by the pool_id
export async function handleEventNominationPoolsCreated(event: SubstrateEvent): Promise<void> {
  const pool = new NominationPoolCreatedEvent(getEventId(event));
  pool.extrinsic_id = getExtrinsicId(event);
  const depositor = event.event.data[0].toString();
  // Creator Address of the pool
  pool.depositor = depositor;
  // Pool ID
  pool.pool_id = Number(event.event.data[1].toString());

  pool.timestamp = event.block.timestamp;
  pool.save();
}