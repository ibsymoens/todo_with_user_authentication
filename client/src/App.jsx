import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";

import { useSelector, useDispatch } from "react-redux";
import { apiFetchTodos, apiGetUserInfo } from "./api";
import { setsessiontoken, setuserinfo, signout } from "./redux/actions/auth";
import { fetch_todos } from "./redux/actions/todo";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const authTokenSelector = useSelector(state => state.auth.token);
  const todoSelector = useSelector(state => state.todo.todo);


  useEffect(() => {
    const storeToken = () => {
      if((authTokenSelector !== null) || (authTokenSelector === null && localStorage.token)) {
        if(authTokenSelector === null) dispatch(setsessiontoken());
        apiGetUserInfo().then(res => {
          dispatch(setuserinfo(res));
          setUser(res);
          // load all todos
          if(Object.keys(todoSelector).length === 0) {
            apiFetchTodos(res.userId)
                .then(res => dispatch(fetch_todos(res)))
                .catch(err => console.log(err.message));
          }
        }).catch(() => dispatch(signout()));;
      }
    }

    storeToken();
  }, [authTokenSelector])

  return (
    <>
        {user === null ?
            <Auth />
          :
          <>
            <Todo />
            <TodoList />
          </>
        }
    </>
  );
}

export default App;