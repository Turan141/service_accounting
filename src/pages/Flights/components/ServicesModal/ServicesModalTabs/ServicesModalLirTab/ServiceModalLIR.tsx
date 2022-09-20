import React, { useEffect, useRef, useState } from 'react';
import { LIRTelegramItem } from './LIRTelegram/LIRTelegramItem';
import styles from './ServiceModalLir.module.scss';
import telegramApi from '@src/api/telegramApi';

export const ServiceModalLIR = ({ flightCode }: any) => {
  const [messages, addMessages] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(true);

  const message = useRef(null) as any;
  const telegramTypeRef = useRef('') as any;

  const getLirs = async () =>
    await telegramApi.getTelegramLir(flightCode);

  const getMvt = async () =>
    await telegramApi.getTelegramMvt(flightCode);

  const getLdm = async () =>
    await telegramApi.getTelegramLdm(flightCode);

  const fetchTelegrams = async () => {
    const allTelegramsFromDB = [] as any;
    await getLirs().then((resp) =>
      allTelegramsFromDB.push(...resp?.response?.data?.result?.items),
    );
    await getMvt().then((resp) =>
      allTelegramsFromDB.push(...resp?.response?.data?.result?.items),
    );
    await getLdm().then((resp) =>
      allTelegramsFromDB.push(...resp?.response?.data?.result?.items),
    );
    allTelegramsFromDB.sort(function (a: any, b: any) {
      return +new Date(b.created) - +new Date(a.created);
    });
    addMessages(allTelegramsFromDB);
  };

  const getAllTelegrams = () => {
    isLoading === false && setIsLoading(true);
    fetchTelegrams().then(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllTelegrams();
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (
      !message.current.value ||
      message.current.value === '' ||
      message.current.value === ' '
    ) {
      return;
    }
    const letter: any = {
      flightCode: flightCode,
      content: message.current.value,
      from: telegramTypeRef?.current?.value,
    };
    setIsLoading(true);
    telegramApi.sendTelegram(letter).then(() => getAllTelegrams());
    message.current.value = '';
  };
  return (
    <div className={styles.ModalLir}>
      <div className={styles.lirs}>
        {isLoading ? (
          <div>
            <div className={styles.loader}></div>
            <div className={styles.loader}></div>
            <div className={styles.loader}></div>
          </div>
        ) : (
          messages?.map((elem: any) => (
            <LIRTelegramItem elem={elem} />
          ))
        )}
      </div>
      <div className={styles.inputForm}>
        <form onSubmit={sendMessage}>
          <select
            ref={telegramTypeRef}
            className={styles.telegramSelect}
          >
            <option className={styles.telegramOption} value={'LIR'}>
              LIR
            </option>
            <option className={styles.telegramOption} value={'MVT'}>
              MVT
            </option>
            <option className={styles.telegramOption} value={'LDM'}>
              LDM
            </option>
          </select>
          <input ref={message} type='text' />
          <button onClick={sendMessage} type='submit'>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
