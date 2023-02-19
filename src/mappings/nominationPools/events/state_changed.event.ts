import {SubstrateEvent} from '@subql/types';
import { getEventId, getExtrinsicId } from '../../../helper/event.helper';
import { NominationPoolState, NominationPoolStateChanged } from '../../../types';

/**
 * The state of a pool has changed
 * @param event 
 */
export async function handleEventNominationPoolsStateChanged(event: SubstrateEvent): Promise<void> {
   const stateChanged = new NominationPoolStateChanged(getEventId(event)); 
   stateChanged.extrinsic_id =  getExtrinsicId(event);
   stateChanged.pool_id = Number(event.event.data[0].toString());
    stateChanged.new_state = NominationPoolState[event.event.data[1].toString()];
    stateChanged.timestamp = event.block.timestamp;
    stateChanged.save();
}