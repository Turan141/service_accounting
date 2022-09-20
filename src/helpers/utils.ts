import KC from '@src/index';

export const checkAccess = (visibleForRoles: string[]) => {
  const userRoles = KC?.getRoles() || [];
  return visibleForRoles.some((value: string) =>
    userRoles.includes(value),
  );
};
// Heating = '70',
// Lavatory = '75',
// ProvisioningMinibus = '71',
// WaterSystemMaintenance = '80',
// AircraftCooling = '73',
// AnyService = 'anyService',
// ProvidingAirLaunchDevice = '74',
// SanitaryInspection = '76',
// DriverProviding = '77',
// ProvisionOfProcessWater = '78',
// ProvidingAnExtensionCord = '79',
// TieDownStraps = '88',
// PersonnelForAdditionalWork = '85',
// ProvisionOfSpecialMachinery = '84',
// DrainContainer = '82',
// ProvisioningEscortVehicle = '83',
// GroundPowerUnit = '81',
// LaddersProvision = '72',
// CompressedGas = '89',
// MaintanceKit = '86',
// ProvidingLiftingTruck = '87',

// export const showTenderName = (serviceNumber: any) => {
//   let serviceName = null;
//   switch (serviceNumber) {
//     case 70:
//       serviceName = 'Подогрев ВС';
//       break;
//     case 75:
//       serviceName = 'Подогрев ВС';
//       break;
//     case 70:
//       serviceName = 'Подогрев ВС';
//       break;
//     case 70:
//       serviceName = 'Подогрев ВС';
//       break;
//     case 70:
//       serviceName = 'Подогрев ВС';
//       break;
//     case 70:
//       serviceName = 'Подогрев ВС';
//       break;

//     default:
//       break;
//   }
//   return serviceName;
// };
