import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolWithdrawnEvent } from "../../../types";

/**
 * A member has withdrawn from their pool.
The given number of points have been dissolved in return of balance.
Similar to Unbonded event, in the absence of slashing, the ratio of point to balance will be 1.
 * @param event 
 */
export async function handleEventNominationPoolsWithdrawn(event: SubstrateEvent): Promise<void> {
    const account = event.event.data[0].toString();
    const withdrawn = new NominationPoolWithdrawnEvent(getEventId(event));
    withdrawn.extrinsic_id =  getExtrinsicId(event);
    withdrawn.account = account;
    withdrawn.pool_id = Number(event.event.data[1].toString());
    withdrawn.balance = BigInt(event.event.data[2].toString());
    withdrawn.point = BigInt(event.event.data[3].toString());
    withdrawn.timestamp = event.block.timestamp;
    withdrawn.save();
}

