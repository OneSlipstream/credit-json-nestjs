import {
  DetailsJoint,
  DetailsJointXML,
} from '../../../../dto/cosmos/account/details/joint';

export const formatDetailsJoint = (joint: DetailsJointXML): DetailsJoint => {
  const isJoint = joint !== undefined ? joint === 1 : null;

  return isJoint;
};
