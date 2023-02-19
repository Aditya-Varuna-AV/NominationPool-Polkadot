import { SubstrateEvent } from '@subql/types';
import {
  getEventId,
  getExtrinsicId,
} from '../../../helper/event.helper';
import { NominationPoolUnbondedEvent } from '../../../types';

/**
 * A member has unbonded from their pool.
balance is the corresponding balance of the number of points that has been requested to be unbonded (the argument of the unbond transaction) from the bonded pool.
points is the number of points that are issued as a result of balance being dissolved into the corresponding unbonding pool.
era is the era in which the balance will be unbonded. In the absence of slashing, these values will match. In the presence of slashing, the number of points that are issued in the unbonding pool will be less than the amount requested to be unbonded.
 * @param event 
 */
export async function handleEventNominationPoolsUnbonded(
  event: SubstrateEvent
): Promise<void> {
  const account = event.event.data[0].toString();
  const unbonded = new NominationPoolUnbondedEvent(getEventId(event));
  unbonded.extrinsic_id = getExtrinsicId(event);
  unbonded.account = account;
  unbonded.pool_id = Number(event.event.data[1].toString());
  unbonded.request_amount_to_unbond = BigInt(event.event.data[2].toString());
  unbonded.actual_amount_unbond = BigInt(event.event.data[3].toString());
  unbonded.era_to_claim = Number(event.event.data[4].toString());
  unbonded.timestamp = event.block.timestamp;
  unbonded.save();
}
