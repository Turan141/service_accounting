export const statuses = {
  total: 10,
  result: [
    { name: 'confirmed', description: 'Подтвержден' },
    { name: 'canceled', description: 'Отменен' },
    {
      name: 'confirmedPerformer',
      description: 'Принято исполнителем',
    },
    { name: 'started', description: 'Начало выполнения' },
    {
      name: 'completedWithoutSignature',
      description: 'Завершена без подписи Агента СПО',
    },
    { name: 'completed', description: 'Завершена' },
    { name: 'rejected', description: 'Отклонено' },
    { name: 'verified', description: 'Проверено' },
    {
      name: 'manualVerification',
      description: 'Нуждается в ручной проверке',
    },
  ],
};

export function statusesByName(statusName: string) {
  switch (statusName) {
    case 'new':
      return 'Новая';
    case 'confirmed':
      return 'Подтвержден';
    case 'canceled':
      return 'Отменен';
    case 'confirmedPerformer':
      return 'Принято исполнителем';
    case 'started':
      return 'Начало выполнения';
    case 'completedWithoutSignature':
      return 'Завершена без подписи Агента СПО';
    case 'completed':
      return 'Завершена';
    case 'completedWithoutPerformer':
      return 'Завершена';
    case 'completedFromDispatcher':
      return 'Завершена';
    case 'rejected':
      return 'Отклонено';
    case 'verified':
      return 'Проверено';
    case 'manualVerification':
      return 'Нуждается в ручной проверке';
    default:
      return 'Не определено';
  }
}
