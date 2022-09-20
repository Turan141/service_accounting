import React, { FC } from 'react';
import { ActionView } from '@typings/swagger/api';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import { DocumentItemNamesEnum } from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';

interface EventMessageProps {
  event: ActionView;
}

enum EventTypesEnum {
  StatusChanged = 'StatusChanged',
  ItemAttachmentAdded = 'ItemAttachmentAdded',
  AttachmentAdded = 'AttachmentAdded',
  DocUpdated = 'DocUpdated',
}

const ItemNamesRuEnum: { [key: string]: string } = {
  customerSign: 'подпись заказчика',
};

const EventMessage: FC<EventMessageProps> = ({ event }) => {
  let message = '';

  switch (event.type) {
    case EventTypesEnum.StatusChanged:
      message += 'Статус изменен: ';
      switch (event.name) {
        case TaskStatusesEnum.Confirmed:
          message += 'заявка согласована и готова к выполнению.';
          break;
        case TaskStatusesEnum.Canceled:
          message += 'заявка отменена.';
          break;
        case TaskStatusesEnum.ManualVerification:
          message += 'заявка на ручной проверке у контроллера.';
          break;
        case TaskStatusesEnum.ConfirmedPerformer:
          message += 'заявка принята исполнителем в работу.';
          break;
        case TaskStatusesEnum.Started:
          message += 'агент начал выполнение заявки.';
          break;
        case TaskStatusesEnum.Completed:
          message += 'агент завершил завершил работы по заявке.';
          break;
        case TaskStatusesEnum.CompletedWithoutSignature:
          message += 'заявка завершена без подписи заказчика.';
          break;
        case TaskStatusesEnum.CompletedFromDispatcher:
          message += 'заявка завершена диспетчером.';
          break;
        case TaskStatusesEnum.CompletedWithoutPerformer:
          message +=
            'заявка завершена диспетчером без участия агента.';
          break;
        default:
          message += event.name;
      }
      break;
    case EventTypesEnum.ItemAttachmentAdded:
      switch (event.name) {
        case DocumentItemNamesEnum.CustomerSign:
          message += 'Добавлена подпись заказчика.';
          break;
        default:
          message = 'Добавлено вложение ';
          if (ItemNamesRuEnum[event.name]) {
            message += ItemNamesRuEnum[event.name];
          } else {
            message += event.name;
          }
          break;
      }
      break;
    case EventTypesEnum.AttachmentAdded:
      message += 'Добавлен документ к заявке.';
      break;
      case EventTypesEnum.DocUpdated:
      message += 'Документ отредактирован.';
      break;
    default:
      message =
        'Неизвестное действие ' + event.name + ' ' + event.type;
      break;
  }

  return <span>{message}</span>;
};

export default EventMessage;
