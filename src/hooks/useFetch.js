import React, { useEffect, useState } from 'react';
import axios from 'axios';

import updateTodo from '../apis/updateTodo';
import { BASE_URL } from '../apis/constant';

const todayMidNight = new Date().setHours(0, 0, 0);

const handleResetRoutine = async (data) => {
  const routineUnCheckedDataPomises = data
    .filter(
      (todo) => todo.isRoutine && todo.isChecked && new Date(todo.last_update_date) < todayMidNight
    )
    .map((routine) => updateTodo({ ...routine, isChecked: false }));

  try {
    await Promise.all(routineUnCheckedDataPomises);

    return data.map((todo) => {
      if (todo.isRoutine && todo.isChecked && new Date(todo.last_update_date) < todayMidNight) {
        return { ...todo, isChecked: false };
      }

      return todo;
    });
  } catch (error) {
    console.log(error);
  }
};

function useFetch(dependencies) {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(BASE_URL, {
          signal: controller.signal,
        });

        const resetedTodo = await handleResetRoutine(data);

        setResponse(resetedTodo);
        setIsLoading(false);
      } catch (error) {
        controller.abort();
      }
    };

    get();

    return () => {
      controller.abort();
    };
  }, dependencies);

  return {
    data: response,
    upateData: (value) => setResponse(value),
    isLoading,
  };
}

export default useFetch;
