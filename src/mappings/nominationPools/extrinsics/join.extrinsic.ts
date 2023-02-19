import { SubstrateExtrinsic } from '@subql/types';
import { NominationPoolJoinExtrinsic } from '../../../types';

export async function handleExtrinsicNominationPoolsJoinPool(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const depositor = extrinsic.extrinsic.signer.toString();
  const timestamp = extrinsic.block.timestamp;
  const pool_id = extrinsic.extrinsic.args[1];
  const amount = extrinsic.extrinsic.args[0];

  const record = new NominationPoolJoinExtrinsic(
    `${extrinsic.block.block.header.number}-${extrinsic.idx}`
  );

  record.timestamp = timestamp;
  record.pool_id = Number(pool_id);
  record.amount = BigInt(amount.toString());
  record.account = depositor;
  await record.save();
}
function isAccountGuard(depositor: string) {
  throw new Error('Function not implemented.');
}

