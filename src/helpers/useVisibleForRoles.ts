// Core
import { useSelector } from 'react-redux';
//import { getRoles } from '@bus/profile/selectors';

export const useVisibleForRoles = (items: ({visibleForRole?: number[]} & Record<string, any>)[] ) => {

  //const roles = useSelector(getRoles);
  //if (!roles) {
    return []
  //}
  // return items.filter(
  //   item => !item.visibleForRole || item.visibleForRole.some(
  //     roleId => roles?.includes(roleId)
  //   )
  // );
}
