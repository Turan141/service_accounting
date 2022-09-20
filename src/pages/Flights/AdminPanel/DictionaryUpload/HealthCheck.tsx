import React, { useCallback, useEffect, useState } from 'react';
import ArtefactsApi from '@src/api/artefactsApi';
import styles from './DictionaryUpload.module.scss';
import { HealthItem } from './HealthItem';

export const HealthCheck = () => {
  const [health, setHealth] = useState(null) as any;
  const [customHealth, setCustomHealth] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // }, []);

  // const modify = async (array: any) => {
  //   // const healthArrWithStatus: any = [...array];
  //   for await (let value of array) {
  //     await ArtefactsApi.checkItemHealth(value).then((resp) => {
  //       console.log(resp);
  //     });
  //   }
  //   return setCustomHealth(array);
  // };

  // const getHealthList1 = useCallback(async () => {
  //   setIsLoading(true);
  //   await ArtefactsApi.getHealthCheck()
  //     .then(async (resp) => {
  //       await setHealth(resp.response.data);
  //     })
  //     .then(async () => {
  //       for await (let i of health) {
  //         console.log(i);
  //         ArtefactsApi.checkItemHealth(i).then((resp) => {
  //           console.log(resp);
  //         });
  //       }
  //       return setCustomHealth(health);
  //     })
  //     .then(() => setIsLoading(false));
  //   console.log(customHealth);
  // }, [health, customHealth]);

  const getHealthList = async () => {
    setIsLoading(true);
    await ArtefactsApi.getHealthCheck()
      .then((resp) =>  setHealth(resp.response.data))
    setIsLoading(false);
  };


  
  // const modify = async (array: any) => {
  //   // const healthArrWithStatus: any = [...array];
  //   for await (let value of array) {
  //     await ArtefactsApi.checkItemHealth(value).then((resp) => {
  //       console.log(resp);
  //     });
  //   }
  //   return setCustomHealth(array);
  // };

    //  ArtefactsApi.getHealthCheck()
    //   .then(async (resp) => {
    //     await setHealth(resp.response.data);
    //   })

    // function getHealthList() {
    //   setIsLoading(true)
    //   return new Promise(resolve => {
    //     resolve(ArtefactsApi.getHealthCheck())
    //   });
    // }
    
    // async function getItemHealth() {
    //   const a = await getHealthList()
    //   return setHealth(a.response.data)
    // }
    
    // getHealthList().then(v => {
    //   console.log(v);  // prints 60 after 4 seconds.
    // });
    
    // async function add2(x) {
    //   const a = resolveAfter2Seconds(20);
    //   const b = resolveAfter2Seconds(30);
    //   return x + await a + await b;
    // }
    
    // add2(10).then(v => {
    //   console.log(v);  // prints 60 after 2 seconds.
    // });

useEffect(() => {
  getHealthList()
}, [])


  return (
    <div className={styles.healthDiv}>
      <div className={styles.header}>
        <div>
          <h1>Название сервиса</h1>
        </div>
        <div>
          <h1>Состояние</h1>
        </div>
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        health &&
        health?.map((elem: any) => (
          <>
          <HealthItem elem={elem}/>
          </>
        ))
      )}
    </div>
  );
};
