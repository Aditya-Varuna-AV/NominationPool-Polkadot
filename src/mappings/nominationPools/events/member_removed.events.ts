import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolMemberRemoved } from "../../../types";

/**
 * A member has been removed from a pool.

The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
 * @param event
 */
export async function handleEventNominationPoolsMemberRemoved(event: SubstrateEvent): Promise<void> {
    const account = event.event.data[1].toString();
    const memberRemoved = new NominationPoolMemberRemoved(getEventId(event));
    memberRemoved.extrinsic_id = getExtrinsicId(event);
    memberRemoved.pool_id = Number(event.event.data[0].toString());
    memberRemoved.account = account;
    memberRemoved.timestamp = event.block.timestamp;
    memberRemoved.save();
}